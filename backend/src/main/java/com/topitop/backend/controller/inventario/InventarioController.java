package com.topitop.backend.controller.inventario;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.topitop.backend.dto.inventario.InventarioDTO;
import com.topitop.backend.service.inventario.InventarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class InventarioController {
	
	private final InventarioService inventarioService;

    // 1. Ver stock (Público)
    @GetMapping("/public/inventario/{productoId}")
    public ResponseEntity<List<InventarioDTO>> verStockPorProducto(
            // 👇 CORREGIDO: Agregamos name="productoId"
            @PathVariable(name = "productoId") Long productoId) {
        return ResponseEntity.ok(inventarioService.listarPorProducto(productoId));
    }

    // 2. Guardar stock (Admin)
    @PostMapping("/admin/inventario")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<InventarioDTO> guardarOActualizar(@Valid @RequestBody InventarioDTO dto) {
        return ResponseEntity.ok(inventarioService.guardar(dto));
    }
    
    // 3. Listar todo (Admin)
    @GetMapping("/admin/inventario")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<InventarioDTO>> listarTodo() {
        return ResponseEntity.ok(inventarioService.listarTodo());
    }
}