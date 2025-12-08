package com.topitop.backend.controller.carrito;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.carrito.AgregarItemRequest;
import com.topitop.backend.dto.carrito.CarritoDTO;
import com.topitop.backend.service.carrito.CarritoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cliente/carrito")
@RequiredArgsConstructor
public class CarritoController {

	private final CarritoService carritoService;

    // 1. VER MI CARRITO ACTUAL
    // No enviamos ID de usuario, Spring lo saca del Token (Principal)
    @GetMapping
    public ResponseEntity<CarritoDTO> verMiCarrito(Principal principal) {
        // principal.getName() devuelve el email del usuario logueado
        return ResponseEntity.ok(carritoService.obtenerCarrito(principal.getName()));
    }

    // 2. AGREGAR PRODUCTO AL CARRITO
    @PostMapping("/items")
    public ResponseEntity<CarritoDTO> agregarItem(
            @Valid @RequestBody AgregarItemRequest request,
            Principal principal) {
        
        return ResponseEntity.ok(carritoService.agregarItem(principal.getName(), request));
    }
    
 // 3. ELIMINAR UN ITEM DEL CARRITO
    // URL: DELETE /api/cliente/carrito/items/5
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CarritoDTO> eliminarItem(
            @PathVariable Long itemId,
            Principal principal) {
        
        return ResponseEntity.ok(carritoService.eliminarItem(principal.getName(), itemId));
    }
	
}
