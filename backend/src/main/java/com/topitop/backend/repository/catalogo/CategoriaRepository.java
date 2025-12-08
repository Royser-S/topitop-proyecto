package com.topitop.backend.repository.catalogo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.catalogo.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    // Buscar categorías que NO tienen padre (Las principales: Hombre, Mujer, Niños)
    List<Categoria> findByCategoriaPadreIsNull();
}