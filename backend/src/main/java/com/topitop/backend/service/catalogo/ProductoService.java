package com.topitop.backend.service.catalogo;

import java.util.ArrayList;
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
        
        // 🔒 SEGURIDAD EXTRA: Si está inactivo o la marca está inactiva, decimos que "No existe"
        // Nota: Asegúrate de usar .isEstado() o .getEstado() según corresponda a tu entidad
        if (!producto.getEstado() || !producto.getMarca().isEstado()) { 
             throw new ResourceNotFoundException("El producto no está disponible actualmente.");
        }

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
            producto.setImagenes(new ArrayList<>()); // Inicializamos la lista vacía
        }

        // VALIDACIÓN DE RELACIONES
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
        
       // LÓGICA CORREGIDA PARA IMÁGENES
        if (dto.getImagenes() != null && !dto.getImagenes().isEmpty()) {
            
            // Si la lista de imágenes del producto es null, la creamos
            if (producto.getImagenes() == null) {
                producto.setImagenes(new ArrayList<>());
            } else {
                // Si quieres reemplazar las fotos al editar, descomenta esto:
                // producto.getImagenes().clear();
            }

            for (int i = 0; i < dto.getImagenes().size(); i++) {
                ProductoImagen img = new ProductoImagen();
                img.setUrlImagen(dto.getImagenes().get(i));
                img.setOrden(i + 1); 
                img.setProducto(producto); // <--- VINCULAMOS LA IMAGEN AL PRODUCTO
                
                // ¡IMPORTANTE! Agregamos la imagen a la lista del producto
                producto.getImagenes().add(img);
            }
        }

        // Al guardar el producto, el CascadeType.ALL guardará las imágenes automáticamente
        Producto guardado = productoRepository.save(producto);
        return convertirADTO(guardado);
    }

    public void eliminar(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        producto.setEstado(false);
        productoRepository.save(producto);
    }
    
    public ProductoDTO cambiarEstado(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        
        // Invertimos el valor (true -> false, false -> true)
        producto.setEstado(!producto.getEstado());
        
        Producto guardado = productoRepository.save(producto);
        return convertirADTO(guardado);
    }
    

    @Transactional(readOnly = true)
    public List<ProductoDTO> listarTodosAdmin() {
        return productoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
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
