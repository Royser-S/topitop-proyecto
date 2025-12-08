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
public class MarcaDTO {

	// Si envías este ID, el sistema ACTUALIZA. Si lo mandas null, CREA.
    private Integer id;

    @NotBlank(message = "El nombre de la marca es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String nombre;

    @NotBlank(message = "El slug es obligatorio")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "El slug solo puede tener letras minúsculas, números y guiones")
    private String slug; 
    
    private String imagenLogo;
    
    // Campo de lectura: Para que el Admin sepa si está activa o no
    private Boolean estado;
}
