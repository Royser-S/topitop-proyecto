package com.topitop.backend.dto.catalogo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TallaDTO {

	private Integer id;

    @NotBlank(message = "El valor de la talla es obligatorio")
    @Size(max = 10, message = "La talla es muy larga (máximo 10 caracteres)")
    private String valor; // Ej: "S", "M", "XXL", "32"
	
}
