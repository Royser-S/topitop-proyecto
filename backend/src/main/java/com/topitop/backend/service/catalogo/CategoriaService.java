package com.topitop.backend.service.catalogo;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.catalogo.CategoriaDTO;
import com.topitop.backend.entity.catalogo.Categoria;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.catalogo.CategoriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoriaService {

	private final CategoriaRepository categoriaRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<CategoriaDTO> listarCategoriasPrincipales() {
        return categoriaRepository.findByCategoriaPadreIsNull().stream()
                .map(cat -> modelMapper.map(cat, CategoriaDTO.class))
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<CategoriaDTO> listarTodas() {
        return categoriaRepository.findAll().stream()
                .map(cat -> modelMapper.map(cat, CategoriaDTO.class))
                .collect(Collectors.toList());
    }

    public CategoriaDTO guardar(CategoriaDTO dto) {
        Categoria categoria = modelMapper.map(dto, Categoria.class);
        
        // Validación fuerte: Si envían ID de padre, TIENE que existir.
        if (dto.getCategoriaPadreId() != null) {
            Categoria padre = categoriaRepository.findById(dto.getCategoriaPadreId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría padre no encontrada con ID: " + dto.getCategoriaPadreId()));
            categoria.setCategoriaPadre(padre);
        }
        
        Categoria guardada = categoriaRepository.save(categoria);
        return modelMapper.map(guardada, CategoriaDTO.class);
    }
	
}
