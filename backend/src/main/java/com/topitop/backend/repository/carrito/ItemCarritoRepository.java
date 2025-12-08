package com.topitop.backend.repository.carrito;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.carrito.ItemCarrito;

public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Long> {
	
	// 1. BUSCAR UN ITEM ESPECÍFICO
    // Sirve para saber si ya tienes el "Polo Rojo S" en el carrito.
    // Si existe, solo sumamos cantidad. Si no, creamos uno nuevo.
    Optional<ItemCarrito> findByCarritoIdAndInventarioId(Long carritoId, Long inventarioId);

    // 2. LISTAR ITEMS DE UN CARRITO (Opcional, pero útil)
    // Por si quieres traer solo los items sin traer toda la entidad Carrito
    List<ItemCarrito> findByCarritoId(Long carritoId);

    // 3. VACIAR CARRITO
    // Útil para cuando se completa la compra y quieres borrar todo de golpe
    void deleteByCarritoId(Long carritoId);
}