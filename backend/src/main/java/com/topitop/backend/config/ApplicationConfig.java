package com.topitop.backend.config;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.topitop.backend.repository.login.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

	private final UsuarioRepository repository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username)
      .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Le enseñamos a convertir de Producto (Entidad) a ProductoDTO
        // Específicamente: Extraer solo las URLs de la lista de objetos ProductoImagen
        modelMapper.typeMap(com.topitop.backend.entity.catalogo.Producto.class, com.topitop.backend.dto.catalogo.ProductoDTO.class)
            .addMappings(mapper -> {
                mapper.using(ctx -> {
                    @SuppressWarnings("unchecked")
                    List<com.topitop.backend.entity.catalogo.ProductoImagen> imagenes = 
                        (List<com.topitop.backend.entity.catalogo.ProductoImagen>) ctx.getSource();
                    
                    if (imagenes == null) return new ArrayList<>();

                    // Convertimos [ObjetoImagen1, ObjetoImagen2] -> ["url1", "url2"]
                    return imagenes.stream()
                            .map(img -> img.getUrlImagen())
                            .collect(Collectors.toList());
                            
                }).map(com.topitop.backend.entity.catalogo.Producto::getImagenes, com.topitop.backend.dto.catalogo.ProductoDTO::setImagenes);
            });

        return modelMapper;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        // CAMBIO AQUÍ: Pasamos el userDetailsService() DENTRO del paréntesis
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService());
        
        // Esta línea YA NO ES NECESARIA (bórrala si la tienes):
        // authProvider.setUserDetailsService(userDetailsService()); 
        
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
}
