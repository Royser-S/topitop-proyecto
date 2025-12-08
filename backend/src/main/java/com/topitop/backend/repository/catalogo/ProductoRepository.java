package com.topitop.backend.repository.catalogo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.topitop.backend.entity.catalogo.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // 1. Buscar solo productos que NO han sido eliminados (estado = true)
    List<Producto> findByEstadoTrue();

    // 2. Buscador del Navbar: Busca por nombre O descripción
    @Query("SELECT p FROM Producto p WHERE p.estado = true AND (LOWER(p.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :termino, '%')))")
    List<Producto> buscarPorTermino(@Param("termino") String termino);

}
