package com.topitop.backend.repository.carrito;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.carrito.Carrito;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
	// 1. EL PRINCIPAL: Buscar el carrito activo para mostrarlo
    Optional<Carrito> findByUsuarioEmail(String email);

    // 2. PARA CHECKOUT: Borrar el carrito después de que se convierte en Orden
    // Spring crea el SQL: "DELETE FROM carrito WHERE usuario_email = ?"
    void deleteByUsuarioEmail(String email);

    // 3. OPTIMIZACIÓN: Saber si existe sin traer todos los datos
    // Útil para poner un puntito rojo en el ícono del carrito en el frontend
    boolean existsByUsuarioEmail(String email);
}