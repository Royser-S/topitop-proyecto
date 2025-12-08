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

import com.topitop.backend.dto.catalogo.TallaDTO;
import com.topitop.backend.service.catalogo.TallaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TallaController {

	private final TallaService tallaService;

    @GetMapping("/public/tallas")
    public ResponseEntity<List<TallaDTO>> listarTodas() {
        return ResponseEntity.ok(tallaService.listarTodas());
    }

    @PostMapping("/admin/tallas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<TallaDTO> crear(@Valid @RequestBody TallaDTO dto) {
        return ResponseEntity.ok(tallaService.guardar(dto));
    }

    @DeleteMapping("/admin/tallas/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        tallaService.eliminar(id);
        return ResponseEntity.ok().build();
    }
	
}
