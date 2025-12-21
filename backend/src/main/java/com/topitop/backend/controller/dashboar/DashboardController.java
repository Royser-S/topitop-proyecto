package com.topitop.backend.controller.dashboar;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.topitop.backend.dto.dashboar.DashboardDTO;
import com.topitop.backend.service.dashboar.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {
	
	// AHORA SÍ: El Controller solo habla con el Service
    private final DashboardService dashboardService;

    @GetMapping("/resumen")
    public ResponseEntity<DashboardDTO> obtenerResumen(
    		// ✅ CORRECTO: Las anotaciones van AQUÍ, en el controlador
            @RequestParam(name = "inicio", required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            
            @RequestParam(name = "fin", required = false) 
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        return ResponseEntity.ok(dashboardService.obtenerResumen(inicio, fin));
    }

}
