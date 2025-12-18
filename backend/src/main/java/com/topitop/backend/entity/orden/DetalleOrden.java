package com.topitop.backend.entity.orden;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.topitop.backend.entity.inventario.Inventario;

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
@Table(name = "detalles_orden")
public class DetalleOrden {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "orden_id", nullable = false)
    @JsonIgnore // <--- 2. AGREGAR ESTA LÍNEA MÁGICA // <--- 2. AGREGAR ESTO
    private Orden orden;

    @ManyToOne
    @JoinColumn(name = "inventario_id")
    private Inventario inventario;

    // Guardamos datos históricos por si el producto se borra después
    @Column(name = "nombre_producto")
    private String nombreProducto;

    private Integer cantidad;

    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    private BigDecimal subtotal;

}
