package com.topitop.backend.entity.catalogo;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "producto_imagenes")
public class ProductoImagen {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url_imagen", nullable = false)
    private String urlImagen;

    private Integer orden;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    @ToString.Exclude // 🚫 CORTA LA RELACIÓN INVERSA
    private Producto producto;
	
}
