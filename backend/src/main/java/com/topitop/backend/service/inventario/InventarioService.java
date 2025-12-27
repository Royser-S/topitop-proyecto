package com.topitop.backend.service.inventario;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException; // ✅ Importante
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
@Transactional
public class InventarioService {

	private final InventarioRepository inventarioRepository;
	private final ProductoRepository productoRepository;
	private final TallaRepository tallaRepository;
	private final ColorRepository colorRepository;
	private final ModelMapper modelMapper;

	@Transactional(readOnly = true)
	public List<InventarioDTO> listarPorProducto(Long productoId) {
		if (!productoRepository.existsById(productoId)) {
			return List.of(); 
		}
		return inventarioRepository.findByProductoId(productoId).stream()
				.map(this::convertirADTO)
				.collect(Collectors.toList());
	}

	public InventarioDTO guardar(InventarioDTO dto) {
		Producto producto = productoRepository.findById(dto.getProductoId())
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
		Talla talla = tallaRepository.findById(dto.getTallaId())
				.orElseThrow(() -> new ResourceNotFoundException("Talla no encontrada"));
		Color color = colorRepository.findById(dto.getColorId())
				.orElseThrow(() -> new ResourceNotFoundException("Color no encontrado"));

		Optional<Inventario> existente = inventarioRepository.findByProductoIdAndTallaIdAndColorId(
				dto.getProductoId(), dto.getTallaId(), dto.getColorId());

		Inventario inventario;

		if (existente.isPresent()) {
			inventario = existente.get();
			inventario.setStock(dto.getStock());
			if (dto.getSku() != null && !dto.getSku().isEmpty()) {
				inventario.setSku(dto.getSku());
			}
		} else {
			inventario = new Inventario();
			inventario.setProducto(producto);
			inventario.setTalla(talla);
			inventario.setColor(color);
			inventario.setStock(dto.getStock());
			
			if (dto.getSku() == null || dto.getSku().isEmpty()) {
				inventario.setSku(generarSku(producto.getNombre(), color.getNombre(), talla.getValor()));
			} else {
				inventario.setSku(dto.getSku());
			}
		}

		try {
			// 👇 AQUÍ PROTEGEMOS EL GUARDADO
			Inventario guardado = inventarioRepository.save(inventario);
			return convertirADTO(guardado);
		} catch (DataIntegrityViolationException e) {
			throw new RuntimeException("Error: El SKU '" + inventario.getSku() + "' ya está registrado. Usa otro.");
		}
	}

	private String generarSku(String prod, String col, String tal) {
		String p = prod.length() > 3 ? prod.substring(0, 3) : prod;
		String c = col.length() > 3 ? col.substring(0, 3) : col;
		long random = System.currentTimeMillis() % 10000;
		return (p + "-" + c + "-" + tal + "-" + random).toUpperCase().replace(" ", "");
	}

	private InventarioDTO convertirADTO(Inventario inv) {
		InventarioDTO dto = modelMapper.map(inv, InventarioDTO.class);
		if (inv.getProducto() != null) {
			dto.setNombreProducto(inv.getProducto().getNombre());
			dto.setProductoActivo(inv.getProducto().getEstado());
			if (inv.getProducto().getMarca() != null) {
				dto.setNombreMarca(inv.getProducto().getMarca().getNombre());
				dto.setMarcaActiva(inv.getProducto().getMarca().isEstado());
			} else {
				dto.setNombreMarca("Sin Marca");
			}
		}
		dto.setNombreTalla(inv.getTalla() != null ? inv.getTalla().getValor() : "-");
		dto.setNombreColor(inv.getColor() != null ? inv.getColor().getNombre() : "-");
		return dto;
	}
	
	@Transactional(readOnly = true)
	public List<InventarioDTO> listarTodo() {
		return inventarioRepository.findAll().stream().map(this::convertirADTO).collect(Collectors.toList());
	}
}