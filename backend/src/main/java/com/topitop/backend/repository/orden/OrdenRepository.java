package com.topitop.backend.repository.orden;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.topitop.backend.entity.orden.Orden;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
	// Trae las últimas 5 órdenes (más recientes primero)
	List<Orden> findTop5ByOrderByFechaDesc();
	
	// NUEVO: Buscar órdenes por rango de fecha y que no estén canceladas
    @Query("SELECT o FROM Orden o WHERE o.fecha BETWEEN :inicio AND :fin AND o.estado != 'CANCELADO'")
    List<Orden> findByFechaBetween(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
	
    // Para que el cliente vea "Mis Pedidos"
    List<Orden> findByUsuarioEmailOrderByFechaDesc(String email);
}