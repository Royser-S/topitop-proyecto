package com.topitop.backend.service.catalogo;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.catalogo.ProductoDTO;
import com.topitop.backend.entity.catalogo.Categoria;
import com.topitop.backend.entity.catalogo.Marca;
import com.topitop.backend.entity.catalogo.Producto;
import com.topitop.backend.entity.catalogo.ProductoImagen;
import com.topitop.backend.exception.ResourceNotFoundException;
import com.topitop.backend.repository.catalogo.CategoriaRepository;
import com.topitop.backend.repository.catalogo.MarcaRepository;
import com.topitop.backend.repository.catalogo.ProductoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional // <--- Protege integridad de datos
public class ProductoService {

	private final ProductoRepository productoRepository;
    private final MarcaRepository marcaRepository;
    private final CategoriaRepository categoriaRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<ProductoDTO> listarProductosPublicos() {
        return productoRepository.findByEstadoTrue().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductoDTO obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        return convertirADTO(producto);
    }

    public ProductoDTO guardar(ProductoDTO dto) {
        Producto producto;

        if (dto.getId() != null && dto.getId() > 0) {
            producto = productoRepository.findById(dto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + dto.getId()));
            
            producto.setNombre(dto.getNombre());
            producto.setDescripcion(dto.getDescripcion());
            producto.setEspecificaciones(dto.getEspecificaciones());
            producto.setPrecio(dto.getPrecio());
            producto.setPrecioDescuento(dto.getPrecioDescuento());
            producto.setDestacado(dto.getDestacado());
        } else {
            producto = modelMapper.map(dto, Producto.class);
            producto.setId(null);
            producto.setEstado(true);
        }

        // VALIDACIÓN DE RELACIONES (Si fallan, Exception -> Rollback)
        if (dto.getMarcaId() != null) {
            Marca marca = marcaRepository.findById(dto.getMarcaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con ID: " + dto.getMarcaId()));
            producto.setMarca(marca);
        }

        if (dto.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con ID: " + dto.getCategoriaId()));
            producto.setCategoria(categoria);
        }
        
       // LÓGICA PARA GUARDAR IMÁGENES (Si el DTO trae fotos)
        if (dto.getImagenes() != null && !dto.getImagenes().isEmpty()) {
            // Primero borramos las anteriores si es edición (para simplificar)
            // Nota: Necesitas inyectar ProductoImagenRepository arriba
            // productoImagenRepository.deleteByProductoId(producto.getId()); 
            
            for (int i = 0; i < dto.getImagenes().size(); i++) {
                ProductoImagen img = new ProductoImagen();
                img.setUrlImagen(dto.getImagenes().get(i));
                img.setOrden(i + 1); // La primera es la portada
                img.setProducto(producto);
                // productoImagenRepository.save(img); // Guardar	
            }
        }

        Producto guardado = productoRepository.save(producto);
        return convertirADTO(guardado);
    }

    public void eliminar(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        producto.setEstado(false);
        productoRepository.save(producto);
    }

    private ProductoDTO convertirADTO(Producto p) {
        ProductoDTO dto = modelMapper.map(p, ProductoDTO.class);
        if (p.getMarca() != null) {
            dto.setMarcaId(p.getMarca().getId());
            dto.setNombreMarca(p.getMarca().getNombre()); // Extra útil para el frontend
        }
        if (p.getCategoria() != null) {
            dto.setCategoriaId(p.getCategoria().getId());
            dto.setNombreCategoria(p.getCategoria().getNombre()); // Extra útil
        }
        return dto;
    }
	
}
