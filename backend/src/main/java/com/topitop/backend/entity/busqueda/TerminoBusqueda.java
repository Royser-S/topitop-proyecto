package com.topitop.backend.entity.busqueda;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "terminos_busqueda")
public class TerminoBusqueda {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String termino; // Ej: "Polo", "Casaca"

    @Column(name = "cantidad_busquedas")
    private Integer cantidadBusquedas; // Ej: 1500 veces buscado

    @Column(name = "ultima_busqueda")
    private LocalDateTime ultimaBusqueda;

    @PrePersist
    public void prePersist() {
        if (cantidadBusquedas == null) cantidadBusquedas = 1;
        if (ultimaBusqueda == null) ultimaBusqueda = LocalDateTime.now();
    }
	
	
}
