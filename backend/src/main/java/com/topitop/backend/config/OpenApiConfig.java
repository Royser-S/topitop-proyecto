package com.topitop.backend.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "TopiTop Clone",
                        email = "alumno@topitop.pe",
                        url = "https://topitop.pe"
                ),
                description = "Documentación de la API para el E-commerce",
                title = "TopiTop API - DAWI",
                version = "1.0",
                license = @License(
                        name = "Licencia Estándar",
                        url = "https://some-url.com"
                ),
                termsOfService = "Términos de servicio"
        ),
        servers = {
                @Server(
                        description = "Servidor Local",
                        url = "http://localhost:8080"
                )
        },
        // Esto activa el candadito en TODOS los endpoints automáticamente
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT de autenticación. Ingrese su token aquí",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {

}
