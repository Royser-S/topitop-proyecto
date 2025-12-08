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

import com.topitop.backend.dto.catalogo.ProductoDTO;
import com.topitop.backend.service.catalogo.ProductoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductoController {

	private final ProductoService productoService;

    // ==========================================
    // RUTAS PÚBLICAS (Cliente)
    // ==========================================

    // 1. Ver catálogo (Solo productos activos)
    @GetMapping("/public/productos")
    public ResponseEntity<List<ProductoDTO>> listarTodos() {
        return ResponseEntity.ok(productoService.listarProductosPublicos());
    }

    // 2. Ver detalle de un producto específico
    @GetMapping("/public/productos/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }

    // ==========================================
    // RUTAS PRIVADAS (Admin)
    // ==========================================

    // 3. Crear Producto (Con validación @Valid)
    @PostMapping("/admin/productos")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductoDTO> crear(@Valid @RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.guardar(dto));
    }

    // 4. Editar Producto
    @PutMapping("/admin/productos")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductoDTO> editar(@Valid @RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.guardar(dto));
    }

    // 5. Eliminar Producto (Borrado Lógico)
    @DeleteMapping("/admin/productos/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.ok().build();
    }
	
}
