package com.topitop.backend.entity.carrito;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.entity.login.Usuario;

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
@Table(name = "items_carrito")
public class ItemCarrito {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con la variante exacta (Producto + Talla + Color)
    @ManyToOne
    @JoinColumn(name = "inventario_id", nullable = false)
    private Inventario inventario;

    @Column(nullable = false)
    private Integer cantidad;

    // Guardamos el precio unitario también por seguridad
    private BigDecimal subtotal; 

    // Relación con el carrito padre
    @ManyToOne
    @JoinColumn(name = "carrito_id")
    @JsonIgnore // Para evitar bucles infinitos al convertir a JSON
    private Carrito carrito;
	
}
