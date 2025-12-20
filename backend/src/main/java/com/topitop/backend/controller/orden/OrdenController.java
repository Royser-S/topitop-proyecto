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
@RequestMapping("/api/admin/ordenes") // Ruta base solo para admins
@RequiredArgsConstructor
public class OrdenController {
	
	private final OrdenService ordenService;


    // ==========================================
    // 🛒 RUTAS DE CLIENTE (Para la Tienda)
    // ==========================================

    // 1. FINALIZAR COMPRA (El botón "Pagar")
    // POST /api/cliente/ordenes?direccion=Av. Larco 123
    @PostMapping("/cliente/ordenes")
    public ResponseEntity<OrdenDTO> crearOrden(
            @RequestParam(defaultValue = "Dirección Principal") String direccion, 
            Principal principal) {
        
        // Aquí llamamos a TU método del Service que ya tienes listo
        return ResponseEntity.ok(ordenService.generarOrden(principal.getName(), direccion));
    }
	
    // 1. Listar el historial completo de ventas
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<OrdenDTO>> listarTodas() {
        return ResponseEntity.ok(ordenService.listarTodas());
    }

    // 2. Cambiar estado (Ej: De 'PAGADO' a 'ENVIADO')
    @PutMapping("/{id}/estado")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<OrdenDTO> cambiarEstado(
            @PathVariable Long id, 
            @RequestParam String nuevoEstado) {
        return ResponseEntity.ok(ordenService.cambiarEstado(id, nuevoEstado));
    }
    

    @GetMapping("/cliente/ordenes/mis-compras")
    public ResponseEntity<List<OrdenDTO>> misCompras(Principal principal) {
        // principal.getName() obtiene el email del token JWT automáticamente
        return ResponseEntity.ok(ordenService.listarMisOrdenes(principal.getName()));
    }

}
