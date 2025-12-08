package com.topitop.backend.repository.catalogo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.catalogo.Talla;

public interface TallaRepository extends JpaRepository<Talla, Integer> {
}