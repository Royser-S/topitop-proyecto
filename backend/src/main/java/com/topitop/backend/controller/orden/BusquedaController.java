package com.topitop.backend.controller.orden;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.service.orden.BusquedaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/busqueda")
@RequiredArgsConstructor
public class BusquedaController {
	
	private final BusquedaService busquedaService;

    // 1. Obtener sugerencias (GET)
    @GetMapping("/tendencias")
    public ResponseEntity<List<String>> verTendencias() {
        return ResponseEntity.ok(busquedaService.obtenerTendencias());
    }

    // 2. Guardar lo que el usuario buscó (POST)
    // Se llama cuando el usuario presiona Enter en la barrita
    @PostMapping("/registrar")
    public ResponseEntity<Void> registrar(@RequestParam String termino) {
        busquedaService.registrarBusqueda(termino);
        return ResponseEntity.ok().build();
    }
}
