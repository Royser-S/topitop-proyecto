package com.topitop.backend.dto.dashboar;
import java.math.BigDecimal;
import java.util.List;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.entity.orden.Orden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
	// --- LOS CONTADORES QUE YA TENÍAS ---
    private BigDecimal totalIngresos;
    private Long cantidadVentas;
    private Integer totalPrendas;
    private Long productosBajoStock;

    // --- LO NUEVO PARA LLENAR EL VACÍO ---
    private List<Orden> ultimasVentas;
    private List<Inventario> listaBajoStock;
	
}
