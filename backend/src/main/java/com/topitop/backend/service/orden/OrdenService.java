package com.topitop.backend.service.orden;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.orden.DetalleOrdenDTO;
import com.topitop.backend.dto.orden.OrdenDTO;
import com.topitop.backend.entity.carrito.Carrito;
import com.topitop.backend.entity.catalogo.Producto;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.entity.login.Usuario;
import com.topitop.backend.entity.orden.DetalleOrden;
import com.topitop.backend.entity.orden.Orden;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.carrito.CarritoRepository;
import com.topitop.backend.repository.inventario.InventarioRepository;
import com.topitop.backend.repository.login.UsuarioRepository;
import com.topitop.backend.repository.orden.OrdenRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class OrdenService {
	
	private final OrdenRepository ordenRepository;
    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final InventarioRepository inventarioRepository; // Para restar stock
    private final ModelMapper modelMapper;

    // GENERAR ORDEN (COMPRAR)
    public OrdenDTO generarOrden(String emailUsuario, String direccionEnvio) {
        
        // 1. Obtener datos
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario).orElseThrow();
        
        Carrito carrito = carritoRepository.findByUsuarioEmail(emailUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("El carrito está vacío"));

        if (carrito.getItems().isEmpty()) {
            throw new RuntimeException("No puedes generar una orden sin productos");
        }

        // 2. Crear Cabecera de Orden
        Orden orden = new Orden();
        orden.setUsuario(usuario);
        orden.setFecha(LocalDateTime.now());
        orden.setTotal(carrito.getTotal());
        orden.setEstado("PAGADO");
        orden.setDireccionEnvio(direccionEnvio);
        orden.setCiudad("Lima"); // Podrías recibirlo en un DTO aparte
        orden.setCodigoPostal("15001");

     // 3. Procesar Detalles (Mapeo + Lógica de Stock)
        List<DetalleOrden> detalles = carrito.getItems().stream().map(item -> {
            
            // A. MAPEO AUTOMÁTICO
            DetalleOrden detalle = modelMapper.map(item, DetalleOrden.class);
            
            // 🛑 CORRECCIÓN CRÍTICA AQUÍ 🛑
            // ModelMapper copió el ID del ItemCarrito (ej: 50).
            // Tenemos que borrarlo para que se cree un NUEVO DetalleOrden (ej: 100).
            detalle.setId(null); 
            
            // B. RELACIÓN PADRE
            detalle.setOrden(orden);
            
            // C. SNAPSHOT HISTÓRICO
            Producto p = item.getInventario().getProducto();
            detalle.setNombreProducto(p.getNombre());
            detalle.setPrecioUnitario(p.getPrecio());

            // D. RESTAR STOCK
            Inventario inv = item.getInventario();
            if (inv.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + p.getNombre());
            }
            inv.setStock(inv.getStock() - item.getCantidad());
            inventarioRepository.save(inv);

            return detalle;
        }).collect(Collectors.toList());

        orden.setDetalles(detalles);

        // 4. Guardar Orden y Vaciar Carrito
        Orden ordenGuardada = ordenRepository.save(orden);
        carritoRepository.delete(carrito); // Borramos el carrito físico

        return convertirADTO(ordenGuardada);
    }
    
    // Convertir Orden -> DTO (Para mostrar el recibo)
    private OrdenDTO convertirADTO(Orden orden) {
        OrdenDTO dto = modelMapper.map(orden, OrdenDTO.class);
        
        // Mapeamos los detalles manualmente para asegurar que salgan bien
        List<DetalleOrdenDTO> detallesDto = orden.getDetalles().stream()
            .map(d -> modelMapper.map(d, DetalleOrdenDTO.class))
            .collect(Collectors.toList());
            
        dto.setDetalles(detallesDto);
        return dto;
    }
    
 // ADMIN: CAMBIAR ESTADO DE ORDEN (Y devolver stock si se cancela)
    public OrdenDTO cambiarEstado(Long ordenId, String nuevoEstado) {
        Orden orden = ordenRepository.findById(ordenId)
                .orElseThrow(() -> new ResourceNotFoundException("Orden no encontrada"));

        // Validar si ya estaba cancelada para no devolver stock doble
        if ("CANCELADO".equals(orden.getEstado())) {
            throw new RuntimeException("Esta orden ya fue cancelada anteriormente");
        }

        // 🔄 LOGICA DE DEVOLUCIÓN DE STOCK
        if ("CANCELADO".equals(nuevoEstado)) {
            // Recorremos los productos que compró
            for (DetalleOrden detalle : orden.getDetalles()) {
                Inventario inv = detalle.getInventario();
                
                // Le devolvemos la cantidad al almacén
                inv.setStock(inv.getStock() + detalle.getCantidad());
                inventarioRepository.save(inv);
            }
        }

        orden.setEstado(nuevoEstado); // Ej: "ENVIADO", "ENTREGADO", "CANCELADO"
        Orden ordenGuardada = ordenRepository.save(orden);
        
        return convertirADTO(ordenGuardada);
    }

}
