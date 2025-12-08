package com.topitop.backend.repository.catalogo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.catalogo.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Integer> {
    // Método mágico para buscar por nombre (ej: verificar si ya existe "Nike")
    boolean existsByNombre(String nombre);
    
 // AGREGADO: Para listar solo las activas en el combo box
    List<Marca> findByEstadoTrue();
    
}