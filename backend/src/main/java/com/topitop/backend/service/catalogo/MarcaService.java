package com.topitop.backend.service.catalogo;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.catalogo.MarcaDTO;
import com.topitop.backend.entity.catalogo.Marca;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.catalogo.MarcaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional // 1. Protege toda la clase. Si falla algo, Rollback.
public class MarcaService {

	private final MarcaRepository marcaRepository;
    private final ModelMapper modelMapper;

    // 2. Solo lectura (Más rápido)
    @Transactional(readOnly = true)
    public List<MarcaDTO> listarActivas() {
        return marcaRepository.findByEstadoTrue().stream()
                .map(marca -> modelMapper.map(marca, MarcaDTO.class))
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<MarcaDTO> listarTodas() {
        return marcaRepository.findAll().stream()
                .map(marca -> modelMapper.map(marca, MarcaDTO.class))
                .collect(Collectors.toList());
    }

    public MarcaDTO guardar(MarcaDTO dto) {
        Marca marca;
        
        boolean esEdicion = dto.getId() != null && dto.getId() > 0;
        
        if (esEdicion) {
            marca = marcaRepository.findById(dto.getId())
                    // 3. Unchecked Exception: Si no existe, explota y cancela todo.
                    .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con ID: " + dto.getId()));
            
            marca.setNombre(dto.getNombre());
            marca.setSlug(dto.getSlug());
            marca.setImagenLogo(dto.getImagenLogo());
        } else {
            marca = modelMapper.map(dto, Marca.class);
            marca.setId(null);
            marca.setEstado(true);
        }

        Marca guardada = marcaRepository.save(marca);
        return modelMapper.map(guardada, MarcaDTO.class);
    }

    public void eliminar(Integer id) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con ID: " + id));
        
        marca.setEstado(false);
        marcaRepository.save(marca);
    }
	
}
