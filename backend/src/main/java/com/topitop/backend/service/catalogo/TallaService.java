package com.topitop.backend.service.catalogo;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.catalogo.TallaDTO;
import com.topitop.backend.entity.catalogo.Talla;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.catalogo.TallaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TallaService {

	private final TallaRepository tallaRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<TallaDTO> listarTodas() {
        return tallaRepository.findAll().stream()
                .map(t -> modelMapper.map(t, TallaDTO.class))
                .collect(Collectors.toList());
    }

    public TallaDTO guardar(TallaDTO dto) {
        Talla talla = modelMapper.map(dto, Talla.class);
        
        // Corrección ID 0
        if (talla.getId() != null && talla.getId() == 0) {
            talla.setId(null);
        }
        
        Talla guardada = tallaRepository.save(talla);
        return modelMapper.map(guardada, TallaDTO.class);
    }
    
    public void eliminar(Integer id) {
        // Verificamos antes de borrar. Si no existe, error 404.
        if (!tallaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Talla no encontrada con ID: " + id);
        }
        tallaRepository.deleteById(id);
    }
	
}
