package com.topitop.backend.controller.login;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.login.RegisterRequest;
import com.topitop.backend.entity.login.Rol;
import com.topitop.backend.entity.login.Usuario;
import com.topitop.backend.repository.login.UsuarioRepository;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

	private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    // 🔒 ESTE ENDPOINT ESTÁ BLINDADO
    // Solo puede entrar alguien que YA tenga rol ADMIN (El Super Admin)
    @PostMapping("/create-admin")
    @PreAuthorize("hasAuthority('ADMIN')") 
    public ResponseEntity<String> createNewAdmin(@RequestBody RegisterRequest request) {
        
        // Verificamos si ya existe
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya existe");
        }

        Usuario newAdmin = new Usuario();
        newAdmin.setNombre(request.getNombre());
        newAdmin.setApellido(request.getApellido());
        newAdmin.setEmail(request.getEmail());
        newAdmin.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // 🚨 AQUÍ ESTÁ LA DIFERENCIA CON EL REGISTRO PÚBLICO
        // Aquí sí permitimos crear un ADMIN explícitamente
        newAdmin.setRol(Rol.ADMIN); 

        repository.save(newAdmin);

        return ResponseEntity.ok("✅ Nuevo Administrador creado exitosamente: " + request.getEmail());
    }
	
}
