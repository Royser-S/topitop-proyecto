package com.topitop.backend.repository.catalogo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.catalogo.Color;

public interface ColorRepository extends JpaRepository<Color, Integer> {
}