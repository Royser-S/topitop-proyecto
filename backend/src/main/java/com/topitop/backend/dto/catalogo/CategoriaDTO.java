package com.topitop.backend.dto.catalogo;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaDTO {

	private Long id;

	@NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción es muy larga (máximo 255 caracteres)")
    private String descripcion;
    
    private String imagenUrl;
    
    private Long categoriaPadreId;
    
    private List<CategoriaDTO> subCategorias;
}
