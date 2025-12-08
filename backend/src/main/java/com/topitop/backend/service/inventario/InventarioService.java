package com.topitop.backend.service.inventario;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.inventario.InventarioDTO;
import com.topitop.backend.entity.catalogo.Color;
import com.topitop.backend.entity.catalogo.Producto;
import com.topitop.backend.entity.catalogo.Talla;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.catalogo.ColorRepository;
import com.topitop.backend.repository.catalogo.ProductoRepository;
import com.topitop.backend.repository.catalogo.TallaRepository;
import com.topitop.backend.repository.inventario.InventarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional // <--- Protege toda la operación (Rollback si falla)
public class InventarioService {

	private final InventarioRepository inventarioRepository;
	private final ProductoRepository productoRepository;
	private final TallaRepository tallaRepository;
	private final ColorRepository colorRepository;
	private final ModelMapper modelMapper;

	// 1. LISTAR POR PRODUCTO (Para ver qué variantes tiene un polo específico)
	@Transactional(readOnly = true)
	public List<InventarioDTO> listarPorProducto(Long productoId) {
		// Verificamos que el producto exista antes de buscar
		if (!productoRepository.existsById(productoId)) {
			throw new ResourceNotFoundException("Producto no encontrado con ID: " + productoId);
		}

		return inventarioRepository.findByProductoId(productoId).stream().map(this::convertirADTO)
				.collect(Collectors.toList());
	}

	// 2. GUARDAR O ACTUALIZAR STOCK (La lógica inteligente)
	public InventarioDTO guardar(InventarioDTO dto) {

		// Paso A: Validar que las llaves foráneas existan (Si no, explota
		// controladamente)
		Producto producto = productoRepository.findById(dto.getProductoId()).orElseThrow(
				() -> new ResourceNotFoundException("Producto no encontrado con ID: " + dto.getProductoId()));

		Talla talla = tallaRepository.findById(dto.getTallaId())
				.orElseThrow(() -> new ResourceNotFoundException("Talla no encontrada con ID: " + dto.getTallaId()));

		Color color = colorRepository.findById(dto.getColorId())
				.orElseThrow(() -> new ResourceNotFoundException("Color no encontrado con ID: " + dto.getColorId()));

		// Paso B: Verificar si esta combinación YA existe en la BD
		Optional<Inventario> existente = inventarioRepository.findByProductoIdAndTallaIdAndColorId(dto.getProductoId(),
				dto.getTallaId(), dto.getColorId());

		Inventario inventario;

		if (existente.isPresent()) {
			// ESCENARIO 1: ACTUALIZAR
			// Ya existe "Polo Rojo S", así que solo actualizamos la cantidad
			inventario = existente.get();
			inventario.setStock(dto.getStock()); // Sobrescribimos el stock
			if (dto.getSku() != null)
				inventario.setSku(dto.getSku());
		} else {
			// ESCENARIO 2: CREAR NUEVO
			// No existe, creamos la relación desde cero
			inventario = new Inventario();
			inventario.setProducto(producto);
			inventario.setTalla(talla);
			inventario.setColor(color);
			inventario.setStock(dto.getStock());
			inventario.setSku(dto.getSku());

			// 🧠 LÓGICA DE SKU AUTOMÁTICO
			if (dto.getSku() == null || dto.getSku().isEmpty()) {
				// Generamos: POL-ROJ-S-123 (Nombre-Color-Talla-Random)
				String skuGenerado = generarSku(producto.getNombre(), color.getNombre(), talla.getValor());
				inventario.setSku(skuGenerado);
			} else {
				inventario.setSku(dto.getSku());
			}
		}

		// Paso C: Guardar y retornar
		Inventario guardado = inventarioRepository.save(inventario);
		return convertirADTO(guardado);
	}

	// Método auxiliar privado para crear el código
	private String generarSku(String prod, String col, String tal) {
		String p = prod.length() > 3 ? prod.substring(0, 3) : prod; // Primeras 3 letras
		String c = col.length() > 3 ? col.substring(0, 3) : col;
		long random = System.currentTimeMillis() % 1000; // 3 números aleatorios

		// Resultado: POL-ROJ-S-958
		return (p + "-" + c + "-" + tal + "-" + random).toUpperCase();
	}

	// Método auxiliar para llenar los nombres (Para que el Admin lea fácil)
	private InventarioDTO convertirADTO(Inventario inv) {
		InventarioDTO dto = modelMapper.map(inv, InventarioDTO.class);

		// Llenamos los nombres extra para el DTO
		dto.setNombreProducto(inv.getProducto().getNombre());
		dto.setNombreTalla(inv.getTalla().getValor());
		dto.setNombreColor(inv.getColor().getNombre());

		return dto;
	}

}
