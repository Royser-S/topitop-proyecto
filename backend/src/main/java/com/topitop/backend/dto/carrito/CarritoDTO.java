package com.topitop.backend.dto.carrito;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarritoDTO {

	private Long id; // ID del carrito
    private BigDecimal total; // La suma de todo
    private Integer cantidadItems; // Cuántas cosas lleva en total (ej: 5 prendas)
    
    // La lista de productos desglosada
    private List<ItemCarritoDTO> items;
	
}
