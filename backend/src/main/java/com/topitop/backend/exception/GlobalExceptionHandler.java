package com.topitop.backend.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.slf4j.Logger;             // <--- IMPORTANTE
import org.slf4j.LoggerFactory;      // <--- IMPORTANTE

import com.topitop.backend.dto.exception.ErrorResponse;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;

@Hidden // <--- 2. AGREGA ESTA LÍNEA (La capa de invisibilidad)
@RestControllerAdvice
public class GlobalExceptionHandler {

	
	// 1. Instanciamos el "Escribano" (Logger)
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	
	// 1. Error 404: No encontrado (Lanzado por nuestros Servicios)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI());
    }

    // 2. Error 400: Validaciones de Spring (@NotBlank, @Min)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        return buildResponse(HttpStatus.BAD_REQUEST, "Error de validación: " + errors.toString(), request.getRequestURI());
    }

    // 3. Error 403: Acceso Denegado (Seguridad)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.FORBIDDEN, "No tienes permisos para realizar esta acción", request.getRequestURI());
    }
    
    // 4. Error 401: Login fallido (Contraseña incorrecta)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas", request.getRequestURI());
    }

 // 5. ERROR CRÍTICO (Exception.class) -> AQUÍ ES DONDE NECESITAMOS EL LOG
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobal(Exception ex, HttpServletRequest request) {
        
        // 🔥 ESTA LÍNEA ESCRIBE EN EL ARCHIVO DE TEXTO
        // Guarda la fecha, hora, mensaje y en qué línea de código explotó
        logger.error("💥 ERROR CRÍTICO NO CONTROLADO: ", ex); 

        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor. Revise los logs.", request.getRequestURI());
    }
    
    

 // ... método buildResponse queda igual ...
    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String message, String path) {
        ErrorResponse error = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .path(path)
                .build();
        return new ResponseEntity<>(error, status);
    }
	
}
