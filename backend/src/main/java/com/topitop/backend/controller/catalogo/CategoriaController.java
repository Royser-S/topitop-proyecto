package com.topitop.backend.controller.catalogo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.catalogo.CategoriaDTO;
import com.topitop.backend.service.catalogo.CategoriaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoriaController {

	private final CategoriaService categoriaService;

    // PÚBLICO: Menú Principal (Solo padres: Hombre, Mujer, Niños)
    // React usará esto para armar el árbol del Navbar
    @GetMapping("/public/categorias/menu")
    public ResponseEntity<List<CategoriaDTO>> listarMenuPrincipal() {
        return ResponseEntity.ok(categoriaService.listarCategoriasPrincipales());
    }

    
    
    // ADMIN: Listar TODAS planas (para el combo box al crear producto)
    @GetMapping("/admin/categorias")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<CategoriaDTO>> listarTodas() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    // ADMIN: Crear o Editar categoría
    @PostMapping("/admin/categorias")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoriaDTO> guardar(@Valid @RequestBody CategoriaDTO dto) {
        return ResponseEntity.ok(categoriaService.guardar(dto));
    }
	
}
