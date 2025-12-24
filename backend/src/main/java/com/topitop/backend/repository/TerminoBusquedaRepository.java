package com.topitop.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.topitop.backend.entity.busqueda.TerminoBusqueda;

public interface TerminoBusquedaRepository extends JpaRepository<TerminoBusqueda, Long> {
    
    Optional<TerminoBusqueda> findByTermino(String termino);

    // SQL Mágico: Dame las 5 palabras más buscadas, ordenadas de mayor a menor
    @Query(value = "SELECT * FROM terminos_busqueda ORDER BY cantidad_busquedas DESC LIMIT 10", nativeQuery = true)
    List<TerminoBusqueda> findTop5MasBuscados();
}