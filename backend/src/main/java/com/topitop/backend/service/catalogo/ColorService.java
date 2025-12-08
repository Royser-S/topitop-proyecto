package com.topitop.backend.service.catalogo;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.catalogo.ColorDTO;
import com.topitop.backend.entity.catalogo.Color;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.catalogo.ColorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ColorService {

	private final ColorRepository colorRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<ColorDTO> listarTodos() {
        return colorRepository.findAll().stream()
                .map(c -> modelMapper.map(c, ColorDTO.class))
                .collect(Collectors.toList());
    }

    public ColorDTO guardar(ColorDTO dto) {
        Color color = modelMapper.map(dto, Color.class);
        
        if (color.getId() != null && color.getId() == 0) {
            color.setId(null);
        }
        
        Color guardado = colorRepository.save(color);
        return modelMapper.map(guardado, ColorDTO.class);
    }
    
    public void eliminar(Integer id) {
        if (!colorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Color no encontrado con ID: " + id);
        }
        colorRepository.deleteById(id);
    }
	
}
