package com.topitop.backend.dto.catalogo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorDTO {

	private Integer id;

    @NotBlank(message = "El nombre del color es obligatorio")
    @Size(max = 20, message = "El nombre del color es muy largo")
    private String nombre;

    @NotBlank(message = "El código HEX es obligatorio")
    // Esta expresión regular (Regex) valida códigos de color #RGB o #RRGGBB
    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "Formato inválido. Debe ser Hexadecimal (ej: #FF0000)")
    private String codigoHex;
	
}
