package com.topitop.backend.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	
	private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desactivar CSRF (No lo necesitamos con JWT)
            .csrf(csrf -> csrf.disable())

            // 2. Definir las reglas de las URLs
            .authorizeHttpRequests(auth -> auth
                // Rutas Públicas (Login, Registro, Swagger)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
                
             // 3. ¡¡ESTO ES LO QUE FALTABA!! Catálogo y Búsqueda -> PÚBLICO
                // Permite que cualquiera vea productos sin estar logueado
                .requestMatchers("/api/public/**").permitAll()
                
                // Rutas Solo para Admin
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                
                // Rutas para Clientes
                .requestMatchers("/api/cliente/**").hasAnyAuthority("ADMIN", "USER")
                
                // Cualquier otra cosa: Pide Token
                .anyRequest().authenticated()
            )

            // 3. No guardar sesión en memoria (Stateless)
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 4. Configurar el proveedor de autenticación
            .authenticationProvider(authenticationProvider)

            // 5. Poner nuestro filtro JWT antes del filtro de usuario/contraseña
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
	
}
