package com.topitop.backend.service.orden;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.entity.busqueda.TerminoBusqueda;
import com.topitop.backend.repository.TerminoBusquedaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BusquedaService {

	private final TerminoBusquedaRepository repository;

    // 1. REGISTRAR UNA BÚSQUEDA (Se llama cuando el usuario da Enter en el buscador)
    public void registrarBusqueda(String termino) {
        if (termino == null || termino.trim().isEmpty()) return;

        String terminoLimpio = termino.trim().toLowerCase(); // Guardamos todo en minúsculas

        TerminoBusqueda tb = repository.findByTermino(terminoLimpio)
                .orElse(new TerminoBusqueda());

        if (tb.getId() == null) {
            // Es nuevo
            tb.setTermino(terminoLimpio);
            tb.setCantidadBusquedas(1);
        } else {
            // Ya existía, sumamos +1
            tb.setCantidadBusquedas(tb.getCantidadBusquedas() + 1);
        }
        
        tb.setUltimaBusqueda(LocalDateTime.now());
        repository.save(tb);
    }

    // 2. OBTENER EL TOP (Para mostrar sugerencias)
    @Transactional(readOnly = true)
    public List<String> obtenerTendencias() {
        return repository.findTop5MasBuscados().stream()
                .map(TerminoBusqueda::getTermino)
                .collect(Collectors.toList());
    }
	
}
