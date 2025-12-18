package com.topitop.backend.dto.inventario;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventarioDTO {
	
	private Long id;

    @NotNull(message = "El producto es obligatorio")
    private Long productoId;

    @NotNull(message = "La talla es obligatoria")
    private Integer tallaId;

    @NotNull(message = "El color es obligatorio")
    private Integer colorId;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
    
    private String sku; // Código único de almacén (Opcional)
    
    // --- CAMPOS DE LECTURA (Para que el Admin lea fácil) ---
    private String nombreProducto;
    private String nombreTalla;
    private String nombreColor;
    
 // INFORMACIÓN DE ESTADO (Para alertas en el Admin)
    private Boolean productoActivo; // ¿El producto está encendido?
    private String nombreMarca;     // Nombre de la marca
    private Boolean marcaActiva;    // ¿La marca está encendida?

}
