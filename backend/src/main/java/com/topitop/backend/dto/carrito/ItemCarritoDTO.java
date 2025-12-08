package com.topitop.backend.dto.carrito;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCarritoDTO {

	private Long id; // ID del item en el carrito (para borrarlo luego)
    private Long inventarioId; // Referencia para saber qué es
    
    // Datos "aplanados" para facilitar la vida a React
    private String nombreProducto;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotal; // precio * cantidad
    
    // Detalles de la variante
    private String talla;
    private String color;
    private String colorHex; // Para pintar la bolita en el carrito
    
    private String imagenUrl; // Para la foto en miniatura
	
}
