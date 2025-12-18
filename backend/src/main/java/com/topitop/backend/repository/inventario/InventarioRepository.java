package com.topitop.backend.repository.inventario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.inventario.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Long> {
	// Trae los productos con stock menor a 5
	List<Inventario> findByStockLessThan(Integer cantidad);
    
    // 1. Listar todo el inventario de un producto específico (Para ver variantes)
    List<Inventario> findByProductoId(Long productoId);

    // 2. Buscar una combinación exacta (Vital para validar si ya existe)
    // SELECT * FROM inventario WHERE producto_id = ? AND talla_id = ? AND color_id = ?
    Optional<Inventario> findByProductoIdAndTallaIdAndColorId(Long productoId, Integer tallaId, Integer colorId);
}