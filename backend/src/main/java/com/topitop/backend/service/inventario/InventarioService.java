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

		// Paso A: Validar existencias
		Producto producto = productoRepository.findById(dto.getProductoId()).orElseThrow(
				() -> new ResourceNotFoundException("Producto no encontrado con ID: " + dto.getProductoId()));

		Talla talla = tallaRepository.findById(dto.getTallaId())
				.orElseThrow(() -> new ResourceNotFoundException("Talla no encontrada con ID: " + dto.getTallaId()));

		Color color = colorRepository.findById(dto.getColorId())
				.orElseThrow(() -> new ResourceNotFoundException("Color no encontrado con ID: " + dto.getColorId()));

		// Paso B: Verificar existencia
		Optional<Inventario> existente = inventarioRepository.findByProductoIdAndTallaIdAndColorId(dto.getProductoId(),
				dto.getTallaId(), dto.getColorId());

		Inventario inventario;

		if (existente.isPresent()) {
			// --- ESCENARIO 1: ACTUALIZAR ---
			inventario = existente.get();
			inventario.setStock(dto.getStock());
			
			// CORRECCIÓN: Si viene SKU del front, úsalo. 
			// Si NO viene, y la base de datos TAMPOCO tiene (está null o vacío), GENÉRALO.
			if (dto.getSku() != null && !dto.getSku().isEmpty()) {
				inventario.setSku(dto.getSku());
			} else if (inventario.getSku() == null || inventario.getSku().isEmpty()) {
				String skuGenerado = generarSku(producto.getNombre(), color.getNombre(), talla.getValor());
				inventario.setSku(skuGenerado);
			}
			
		} else {
			// --- ESCENARIO 2: CREAR NUEVO ---
			inventario = new Inventario();
			inventario.setProducto(producto);
			inventario.setTalla(talla);
			inventario.setColor(color);
			inventario.setStock(dto.getStock());

			// LÓGICA DE SKU AUTOMÁTICO
			if (dto.getSku() == null || dto.getSku().isEmpty()) {
				String skuGenerado = generarSku(producto.getNombre(), color.getNombre(), talla.getValor());
				inventario.setSku(skuGenerado);
			} else {
				inventario.setSku(dto.getSku());
			}
		}

		Inventario guardado = inventarioRepository.save(inventario);
		return convertirADTO(guardado);
	}

	private String generarSku(String prod, String col, String tal) {
		String p = prod.length() > 3 ? prod.substring(0, 3) : prod; // Primeras 3 letras
		String c = col.length() > 3 ? col.substring(0, 3) : col;
		long random = System.currentTimeMillis() % 1000; // 3 números aleatorios

		return (p + "-" + c + "-" + tal + "-" + random).toUpperCase();
	}

	// Método auxiliar para llenar los nombres (Para que el Admin lea fácil)
		private InventarioDTO convertirADTO(Inventario inv) {
			InventarioDTO dto = modelMapper.map(inv, InventarioDTO.class);

			// Datos básicos
			dto.setNombreProducto(inv.getProducto().getNombre());
			dto.setNombreTalla(inv.getTalla().getValor());
			dto.setNombreColor(inv.getColor().getNombre());

			// 1. Producto usa Boolean -> getEstado()
			dto.setProductoActivo(inv.getProducto().getEstado());
			
			if (inv.getProducto().getMarca() != null) {
				dto.setNombreMarca(inv.getProducto().getMarca().getNombre());
				
				// 2. CORRECCIÓN: Marca usa boolean -> isEstado()
				// Si te sale en rojo "getEstado", cámbialo por "isEstado"
				dto.setMarcaActiva(inv.getProducto().getMarca().isEstado()); 
			}

			return dto;
		}
	
	// NUEVO: Listar TODO el inventario (para la vista inicial del Admin)
		@Transactional(readOnly = true)
		public List<InventarioDTO> listarTodo() {
			return inventarioRepository.findAll().stream()
					.map(this::convertirADTO)
					.collect(Collectors.toList());
		}

}
