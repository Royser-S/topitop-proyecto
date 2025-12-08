package com.topitop.backend.dto.carrito;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgregarItemRequest {

	@NotNull(message = "Debes seleccionar un producto (inventario)")
    private Long inventarioId;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "Mínimo debes comprar 1 unidad")
    private Integer cantidad;
	
}
