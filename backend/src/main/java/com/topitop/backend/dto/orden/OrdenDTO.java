package com.topitop.backend.dto.orden;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenDTO {

private Long id;
    
    private LocalDateTime fecha;

    @NotNull(message = "El total es obligatorio")
    @PositiveOrZero(message = "El total no puede ser negativo")
    private BigDecimal total;

    @NotBlank(message = "El estado es obligatorio")
    private String estado; // PENDIENTE, PAGADO, etc.

    @NotBlank(message = "La dirección de envío es obligatoria")
    @Size(min = 5, max = 255, message = "La dirección debe tener entre 5 y 255 caracteres")
    private String direccionEnvio;
    
    // Lista de detalles (validamos que la lista no sea nula)
    private List<DetalleOrdenDTO> detalles;
	
}
