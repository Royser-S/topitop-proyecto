package com.topitop.backend.repository.orden;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.orden.DetalleOrden;

public interface DetalleOrdenRepository extends JpaRepository<DetalleOrden, Long> {
}	