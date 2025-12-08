package com.topitop.backend.repository.orden;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.orden.Orden;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
    // Para que el cliente vea "Mis Pedidos"
    List<Orden> findByUsuarioEmailOrderByFechaDesc(String email);
}