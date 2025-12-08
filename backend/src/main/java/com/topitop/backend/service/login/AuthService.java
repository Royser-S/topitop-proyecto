package com.topitop.backend.service.login;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.topitop.backend.security.JwtService;
import com.topitop.backend.dto.login.AuthResponse;
import com.topitop.backend.dto.login.LoginRequest;
import com.topitop.backend.dto.login.RegisterRequest;
import com.topitop.backend.entity.login.Rol;
import com.topitop.backend.entity.login.Usuario;
import com.topitop.backend.repository.login.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // MÉTODO REGISTRO
    public AuthResponse register(RegisterRequest request) {
        // 1. Creamos el objeto Usuario con los datos que llegan
        Usuario user = new Usuario();
        user.setNombre(request.getNombre());
        user.setApellido(request.getApellido());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ¡Encriptamos la contraseña!
        user.setRol(Rol.USER); // Por defecto todos son clientes

        // 2. Guardamos en BD
        repository.save(user);

        // 3. Generamos el token y lo devolvemos
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder().token(jwtToken).build();
    }

    // MÉTODO LOGIN
    public AuthResponse login(LoginRequest request) {
        // 1. Validamos usuario y contraseña (si falla, lanza error automático)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. Si pasó, buscamos al usuario para generar su token
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        
        return AuthResponse.builder().token(jwtToken).build();
    }
	
}
