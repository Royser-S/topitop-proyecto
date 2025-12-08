package com.topitop.backend.service.carrito;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.carrito.AgregarItemRequest;
import com.topitop.backend.dto.carrito.CarritoDTO;
import com.topitop.backend.dto.carrito.ItemCarritoDTO;
import com.topitop.backend.entity.carrito.Carrito;
import com.topitop.backend.entity.carrito.ItemCarrito;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.entity.login.Usuario;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.carrito.CarritoRepository;
import com.topitop.backend.repository.carrito.ItemCarritoRepository;
import com.topitop.backend.repository.inventario.InventarioRepository;
import com.topitop.backend.repository.login.UsuarioRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class CarritoService {

	private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final InventarioRepository inventarioRepository;
    private final ItemCarritoRepository itemCarritoRepository;
    private final ModelMapper modelMapper;

    // MÉTODO PRINCIPAL: Agregar item al carrito del usuario logueado
    public CarritoDTO agregarItem(String emailUsuario, AgregarItemRequest request) {
        
        // 1. Buscamos al usuario y el producto (Inventario)
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Inventario inventario = inventarioRepository.findById(request.getInventarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado o agotado"));

        // 2. Validar Stock
        if (inventario.getStock() < request.getCantidad()) {
            throw new RuntimeException("Stock insuficiente. Solo quedan: " + inventario.getStock());
        }

        // 3. Buscar o Crear Carrito
        Carrito carrito = carritoRepository.findByUsuarioEmail(emailUsuario)
                .orElseGet(() -> {
                    Carrito nuevo = new Carrito();
                    nuevo.setUsuario(usuario);
                    return nuevo;
                });

        // 4. Verificar si el producto YA estaba en el carrito para sumar cantidad
        Optional<ItemCarrito> itemExistente = carrito.getItems().stream()
                .filter(item -> item.getInventario().getId().equals(inventario.getId()))
                .findFirst();

        if (itemExistente.isPresent()) {
            // Ya existe: Sumamos la cantidad
            ItemCarrito item = itemExistente.get();
            item.setCantidad(item.getCantidad() + request.getCantidad());
            item.setSubtotal(inventario.getProducto().getPrecio().multiply(new BigDecimal(item.getCantidad())));
        } else {
            // Nuevo item
            ItemCarrito item = new ItemCarrito();
            item.setInventario(inventario);
            item.setCantidad(request.getCantidad());
            item.setSubtotal(inventario.getProducto().getPrecio().multiply(new BigDecimal(request.getCantidad())));
            item.setCarrito(carrito);
            carrito.getItems().add(item);
        }

        // 5. Recalcular Total del Carrito
        recalcularTotal(carrito);

        Carrito guardado = carritoRepository.save(carrito);
        return convertirADTO(guardado);
    }
    
    // Método auxiliar para obtener el carrito actual (Para verlo al entrar)
    public CarritoDTO obtenerCarrito(String email) {
        Carrito carrito = carritoRepository.findByUsuarioEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito vacío o no encontrado"));
        return convertirADTO(carrito);
    }

    // --- MÉTODOS PRIVADOS ---

    private void recalcularTotal(Carrito carrito) {
        BigDecimal total = carrito.getItems().stream()
                .map(ItemCarrito::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        carrito.setTotal(total);
    }

    private CarritoDTO convertirADTO(Carrito carrito) {
        // 1. Convertimos la cabecera (ID, Total, Fecha) automático
        CarritoDTO dto = modelMapper.map(carrito, CarritoDTO.class);
        
        // 2. Calculamos la cantidad de items visuales
        dto.setCantidadItems(carrito.getItems().size());
        
        // 3. Mapeamos la lista de items
        List<ItemCarritoDTO> listaItems = carrito.getItems().stream().map(item -> {
            
            // A. Usamos ModelMapper para lo fácil (ID, Cantidad, Subtotal)
            ItemCarritoDTO itemDto = modelMapper.map(item, ItemCarritoDTO.class);
            
            // B. Hacemos MANUAL lo "Profundo" (Nombres, Tallas, Colores)
            // Esto es necesario porque ModelMapper no adivina estas rutas largas
            Inventario inv = item.getInventario();
            itemDto.setInventarioId(inv.getId());
            itemDto.setNombreProducto(inv.getProducto().getNombre());
            itemDto.setPrecioUnitario(inv.getProducto().getPrecio());
            itemDto.setImagenUrl(inv.getProducto().getImagenes().isEmpty() ? null : inv.getProducto().getImagenes().get(0).getUrlImagen());
            
            itemDto.setTalla(inv.getTalla().getValor());
            itemDto.setColor(inv.getColor().getNombre());
            itemDto.setColorHex(inv.getColor().getCodigoHex());
            
            return itemDto;
        }).collect(Collectors.toList());
        
        dto.setItems(listaItems);
        return dto;
    }
    
    
 // ELIMINAR ITEM (Con validación de seguridad)
    public CarritoDTO eliminarItem(String emailUsuario, Long itemId) {
        // 1. Buscamos el item a borrar
        ItemCarrito item = itemCarritoRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item no encontrado"));

        // 2. SEGURIDAD: Verificar que este item pertenezca al carrito del usuario logueado
        // Si el email del dueño del carrito NO coincide con el email del token -> ERROR
        if (!item.getCarrito().getUsuario().getEmail().equals(emailUsuario)) {
            throw new RuntimeException("No tienes permiso para eliminar este item");
        }

        // 3. Obtenemos referencia al carrito padre antes de borrar el hijo
        Carrito carrito = item.getCarrito();

        // 4. Borramos el item de la BD
        // También lo quitamos de la lista en memoria para que el recálculo funcione
        carrito.getItems().remove(item);
        itemCarritoRepository.delete(item);

        // 5. Recalcular el total del carrito (ahora tiene un producto menos)
        recalcularTotal(carrito);
        Carrito carritoActualizado = carritoRepository.save(carrito);

        return convertirADTO(carritoActualizado);
    }
    
	
}
