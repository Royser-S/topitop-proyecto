package com.topitop.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.topitop.backend.entity.login.Rol;
import com.topitop.backend.entity.login.Usuario;
import com.topitop.backend.repository.login.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner{
	
	private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Verificamos si ya existe el admin para no duplicarlo
        String emailAdmin = "admin@topitop.pe";
        
        if (usuarioRepository.findByEmail(emailAdmin).isEmpty()) {
            // 2. Si no existe, lo creamos
            Usuario admin = new Usuario();
            admin.setNombre("Super");
            admin.setApellido("Administrador");
            admin.setEmail(emailAdmin);
            admin.setRol(Rol.ADMIN); // <--- ¡AQUÍ ESTÁ LA MAGIA!
            
            // 3. Encriptamos la contraseña "admin123"
            admin.setPassword(passwordEncoder.encode("admin123"));
            
            usuarioRepository.save(admin);
            
            System.out.println("---------------------------------------------");
            System.out.println("✅ USUARIO ADMIN CREADO AUTOMÁTICAMENTE");
            System.out.println("📧 Email: " + emailAdmin);
            System.out.println("🔑 Pass:  admin123");
            System.out.println("---------------------------------------------");
        }
    }

}
