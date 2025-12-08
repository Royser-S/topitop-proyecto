package com.topitop.backend.controller.inventario;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.inventario.InventarioDTO;
import com.topitop.backend.service.inventario.InventarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class InventarioController {
	
	private final InventarioService inventarioService;

    // ==========================================
    // RUTAS PÚBLICAS (Cliente / Tienda)
    // ==========================================

    // 1. Ver el stock disponible de un producto (Para pintar botones de tallas)
    // URL: /api/public/inventario/1
    @GetMapping("/public/inventario/{productoId}")
    public ResponseEntity<List<InventarioDTO>> verStockPorProducto(@PathVariable Long productoId) {
        return ResponseEntity.ok(inventarioService.listarPorProducto(productoId));
    }

    // ==========================================
    // RUTAS PRIVADAS (Admin)
    // ==========================================

    // 2. Agregar o Actualizar Stock (El "Upsert")
    // URL: /api/admin/inventario
    @PostMapping("/admin/inventario")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<InventarioDTO> guardarOActualizar(@Valid @RequestBody InventarioDTO dto) {
        return ResponseEntity.ok(inventarioService.guardar(dto));
    }

}
