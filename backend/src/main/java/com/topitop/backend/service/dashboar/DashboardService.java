package com.topitop.backend.service.dashboar;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.dashboar.DashboardDTO;
import com.topitop.backend.dto.inventario.InventarioDTO;
import com.topitop.backend.dto.orden.OrdenDTO;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.entity.orden.Orden;
import com.topitop.backend.repository.inventario.InventarioRepository;
import com.topitop.backend.repository.orden.OrdenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OrdenRepository ordenRepository;
    private final InventarioRepository inventarioRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public DashboardDTO obtenerResumen(LocalDateTime inicio, LocalDateTime fin) {
        
        List<Orden> ordenes = (inicio != null && fin != null) 
            ? ordenRepository.findByFechaBetween(inicio, fin) 
            : ordenRepository.findAll();

        List<Orden> ventasValidas = ordenes.stream()
                .filter(o -> !"CANCELADO".equals(o.getEstado()))
                .collect(Collectors.toList());

        BigDecimal totalIngresos = ventasValidas.stream()
                .map(Orden::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Long cantidadVentas = (long) ventasValidas.size();

        List<Inventario> inventario = inventarioRepository.findAll();
        
        Integer totalPrendas = inventario.stream()
                .mapToInt(i -> i.getStock() != null ? i.getStock() : 0).sum();

        Long bajoStockCount = inventario.stream()
                .filter(i -> i.getStock() != null && i.getStock() < 5).count();

        // Conversión segura de Órdenes
        List<OrdenDTO> ultimas5DTO = ordenes.stream()
                .sorted((o1, o2) -> o2.getFecha().compareTo(o1.getFecha()))
                .limit(5)
                .map(orden -> modelMapper.map(orden, OrdenDTO.class))
                .collect(Collectors.toList());

        // Conversión segura de Inventario (CON NOMBRES)
        List<InventarioDTO> listaCriticaDTO = inventario.stream()
                .filter(i -> i.getStock() != null && i.getStock() < 5)
                .limit(5)
                .map(this::convertirInventarioSimple) // <--- Aquí se llenan los nombres
                .collect(Collectors.toList());

        return new DashboardDTO(totalIngresos, cantidadVentas, totalPrendas, bajoStockCount, ultimas5DTO, listaCriticaDTO);
    }

    private InventarioDTO convertirInventarioSimple(Inventario inv) {
        InventarioDTO dto = new InventarioDTO();
        dto.setId(inv.getId());
        dto.setStock(inv.getStock());
        dto.setSku(inv.getSku());
        
        // ⚠️ ESTO ES LO QUE HACE QUE SALGA EL NOMBRE
        if (inv.getProducto() != null) {
            dto.setProductoId(inv.getProducto().getId());
            dto.setNombreProducto(inv.getProducto().getNombre()); // ✅ NOMBRE
            dto.setProductoActivo(inv.getProducto().getEstado());
            if (inv.getProducto().getMarca() != null) {
                dto.setNombreMarca(inv.getProducto().getMarca().getNombre()); // ✅ MARCA
            }
        }
        if (inv.getTalla() != null) dto.setNombreTalla(inv.getTalla().getValor()); // ✅ TALLA
        if (inv.getColor() != null) dto.setNombreColor(inv.getColor().getNombre()); // ✅ COLOR
        
        return dto;
    }
}