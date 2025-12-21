package com.topitop.backend.dto.dashboar;
import java.math.BigDecimal;
import java.util.List;

import com.topitop.backend.dto.inventario.InventarioDTO;
import com.topitop.backend.dto.orden.OrdenDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
	// --- LOS CONTADORES QUE YA TENÍAS ---
	// --- LOS CONTADORES QUE YA TENÍAS ---
    private BigDecimal totalIngresos;
    private Long cantidadVentas;
    private Integer totalPrendas;
    private Long productosBajoStock;

    private List<OrdenDTO> ultimasVentas;
    private List<InventarioDTO> listaBajoStock;
}
