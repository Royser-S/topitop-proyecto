package com.topitop.backend.controller.catalogo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.catalogo.ColorDTO;
import com.topitop.backend.service.catalogo.ColorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ColorController {
	
	private final ColorService colorService;

    @GetMapping("/public/colores")
    public ResponseEntity<List<ColorDTO>> listarTodos() {
        return ResponseEntity.ok(colorService.listarTodos());
    }

    @PostMapping("/admin/colores")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ColorDTO> crear(@Valid @RequestBody ColorDTO dto) {
        return ResponseEntity.ok(colorService.guardar(dto));
    }

    @DeleteMapping("/admin/colores/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        colorService.eliminar(id);
        return ResponseEntity.ok().build();
    }

}
