package com.topitop.backend.controller.catalogo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.catalogo.MarcaDTO;
import com.topitop.backend.service.catalogo.MarcaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MarcaController {

	private final MarcaService marcaService;

    // PÚBLICO: Lista solo marcas activas (para el filtro de la tienda)
    @GetMapping("/public/marcas")
    public ResponseEntity<List<MarcaDTO>> listarActivas() {
        return ResponseEntity.ok(marcaService.listarActivas());
    }

    // ADMIN: Lista TODAS (incluso las eliminadas, para gestión)
    @GetMapping("/admin/marcas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<MarcaDTO>> listarTodas() {
        return ResponseEntity.ok(marcaService.listarTodas());
    }

    // ADMIN: Crear nueva marca
    @PostMapping("/admin/marcas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<MarcaDTO> crear(@Valid @RequestBody MarcaDTO dto) {
        return ResponseEntity.ok(marcaService.guardar(dto));
    }

    // ADMIN: Editar marca existente
    @PutMapping("/admin/marcas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<MarcaDTO> editar(@Valid @RequestBody MarcaDTO dto) {
        return ResponseEntity.ok(marcaService.guardar(dto));
    }

    // ADMIN: Eliminar (Borrado lógico)
    @DeleteMapping("/admin/marcas/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        marcaService.eliminar(id);
        return ResponseEntity.ok().build();
    }
	
}
