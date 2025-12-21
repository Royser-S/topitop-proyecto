package com.topitop.backend.controller.orden;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.topitop.backend.dto.orden.OrdenDTO;
import com.topitop.backend.service.orden.OrdenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api") // 1. CAMBIO: Ruta base genérica para no bloquear a nadie
@RequiredArgsConstructor
public class OrdenController {
	
	private final OrdenService ordenService;

    // ==========================================
    // 🛒 RUTAS DE CLIENTE (Públicas o solo login normal)
    // ==========================================

    // 1. FINALIZAR COMPRA
    // URL Final: POST /api/cliente/ordenes
    @PostMapping("/cliente/ordenes")
    public ResponseEntity<OrdenDTO> crearOrden(
            @RequestParam(defaultValue = "Dirección Principal") String direccion, 
            Principal principal) {
        return ResponseEntity.ok(ordenService.generarOrden(principal.getName(), direccion));
    }

    // 2. VER MIS COMPRAS
    // URL Final: GET /api/cliente/ordenes/mis-compras
    @GetMapping("/cliente/ordenes/mis-compras")
    public ResponseEntity<List<OrdenDTO>> misCompras(Principal principal) {
        return ResponseEntity.ok(ordenService.listarMisOrdenes(principal.getName()));
    }

    // ==========================================
    // 👮 RUTAS DE ADMIN (Protegidas con PreAuthorize)
    // ==========================================

    // 3. LISTAR TODAS (Para tu panel)
    // URL Final: GET /api/admin/ordenes
    @GetMapping("/admin/ordenes")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<OrdenDTO>> listarTodas() {
        return ResponseEntity.ok(ordenService.listarTodas());
    }

    // 4. CAMBIAR ESTADO
    // URL Final: PUT /api/admin/ordenes/{id}/estado
    @PutMapping("/admin/ordenes/{id}/estado")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<OrdenDTO> cambiarEstado(
    		@PathVariable(name = "id") Long id, 
            @RequestParam(name = "nuevoEstado") String nuevoEstado) {
        return ResponseEntity.ok(ordenService.cambiarEstado(id, nuevoEstado));
    }

}
