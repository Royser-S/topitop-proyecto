package com.topitop.backend.dto.catalogo;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoDTO {

	private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 150, message = "El nombre debe tener entre 3 y 150 caracteres")
    private String nombre;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;
    
    private String especificaciones;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser mayor a 0")
    @Digits(integer = 8, fraction = 2, message = "El precio solo acepta 2 decimales (ej: 99.90)")
    private BigDecimal precio;

    @PositiveOrZero(message = "El descuento no puede ser negativo")
    @Digits(integer = 8, fraction = 2, message = "El descuento solo acepta 2 decimales")
    private BigDecimal precioDescuento;

    private Boolean destacado;
    private Boolean estado;
    
    @NotNull(message = "La marca es obligatoria")
    private Integer marcaId;

    @NotNull(message = "La categoría es obligatoria")
    private Long categoriaId;

    // ESTO DEBE ESTAR DESCOMENTADO PARA QUE RECIBA LAS URLS
    @Size(max = 5, message = "Máximo 5 imágenes por producto")
    private List<String> imagenes;
    // ...
 // 👇 ESTO ES LO QUE TE FALTA AGREGAR 👇
    private String nombreMarca;
    private String nombreCategoria;
	
}
