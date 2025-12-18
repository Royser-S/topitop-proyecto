package com.topitop.backend.service.dashboar;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.topitop.backend.dto.dashboar.DashboardDTO;
import com.topitop.backend.entity.inventario.Inventario;
import com.topitop.backend.entity.orden.Orden;
import com.topitop.backend.repository.inventario.InventarioRepository;
import com.topitop.backend.repository.orden.OrdenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) 

public class DashboardService {

	private final OrdenRepository ordenRepository;
	private final InventarioRepository inventarioRepository;

	public DashboardDTO obtenerResumen(LocalDateTime inicio, LocalDateTime fin) {

		List<Orden> ordenesFiltradas;
		if (inicio != null && fin != null) {
			ordenesFiltradas = ordenRepository.findByFechaBetween(inicio, fin);
		} else {
			ordenesFiltradas = ordenRepository.findAll().stream().filter(o -> !o.getEstado().equals("CANCELADO"))
					.toList(); //
		}

		BigDecimal totalIngresos = ordenesFiltradas.stream().map(Orden::getTotal).reduce(BigDecimal.ZERO,
				BigDecimal::add);

		long cantidadVentas = ordenesFiltradas.size();

		List<Inventario> inventario = inventarioRepository.findAll();
		int totalPrendas = inventario.stream().mapToInt(Inventario::getStock).sum(); //
		long bajoStockCount = inventario.stream().filter(i -> i.getStock() < 5).count(); //

		List<Orden> ultimas5 = ordenRepository.findTop5ByOrderByFechaDesc(); //
		List<Inventario> listaCritica = inventarioRepository.findByStockLessThan(5); //

		return new DashboardDTO(totalIngresos, cantidadVentas, totalPrendas, bajoStockCount, ultimas5, listaCritica);
	}

}
