package com.topitop.backend.entity.inventario;

import com.topitop.backend.entity.catalogo.Color;
import com.topitop.backend.entity.catalogo.Producto;
import com.topitop.backend.entity.catalogo.Talla;

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

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "inventario")
public class Inventario {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con el Producto (Camisa)
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    // Relación con la Talla (M)
    @ManyToOne
    @JoinColumn(name = "talla_id", nullable = false)
    private Talla talla;

    // Relación con el Color (Rojo)
    @ManyToOne
    @JoinColumn(name = "color_id", nullable = false)
    private Color color;

    @Column(nullable = false)
    private Integer stock;
    
    @Column(unique = true)
    private String sku; // Código de barras
	
}
