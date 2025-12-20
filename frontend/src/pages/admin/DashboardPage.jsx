import React, { useEffect, useState, useCallback } from 'react';
import dashboardService from '../../services/dashboard.service';
import StatsCards from '../../components/dashboard/StatsCards';
import SalesChart from '../../components/dashboard/SalesChart';     // <--- Gráfico de Ingresos
import TendenciasCard from '../../components/dashboard/TendenciasCard'; // <--- ¡Restaurado!
import VentasTable from '../../components/ventas/VentasTabla';     // <--- Tabla Reutilizable

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [datosTendencias, setDatosTendencias] = useState([]); // <--- Estado para tendencias
    const [loading, setLoading] = useState(true);
    const [rango, setRango] = useState('todo');

    const cargarDatos = useCallback(async () => {
        try {
            let inicio = null, fin = null;
            const ahora = new Date();
            
            if (rango === 'hoy') {
                inicio = new Date(ahora.setHours(0,0,0,0)).toISOString();
                fin = new Date().toISOString();
            } else if (rango === '7dias') {
                inicio = new Date(ahora.setDate(ahora.getDate() - 7)).toISOString();
                fin = new Date().toISOString();
            }

            // 1. Cargamos AMBOS servicios en paralelo
            const [resumenData, tendenciasData] = await Promise.all([
                dashboardService.getResumen(inicio, fin),
                dashboardService.getTendencias()
            ]);
            
            // 2. Procesamos las tendencias (Lógica original restaurada)
            const tendenciasFormateadas = (tendenciasData || []).map(t => ({
                name: t.toUpperCase(),
                busquedas: Math.floor(Math.random() * 100) + 1 // O el dato real si lo tienes
            }));

            setStats(resumenData);
            setDatosTendencias(tendenciasFormateadas);

        } catch (error) {
            console.error("Error cargando dashboard:", error);
        } finally {
            setLoading(false);
        }
    }, [rango]);

    useEffect(() => {
        cargarDatos();
        const intervalo = setInterval(cargarDatos, 30000);
        return () => clearInterval(intervalo);
    }, [cargarDatos]);

    if (loading || !stats) return <div className="p-5 text-center text-muted">Cargando panel...</div>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">
                    <i className="bi bi-speedometer2 me-2"></i>Panel de Control
                </h2>
                
                <select 
                    className="form-select w-auto shadow-sm" 
                    value={rango} 
                    onChange={(e) => setRango(e.target.value)}
                >
                    <option value="todo">Todo el tiempo</option>
                    <option value="hoy">Hoy</option>
                    <option value="7dias">Últimos 7 días</option>
                </select>
            </div>

            {/* 1. TARJETAS SUPERIORES */}
            <StatsCards stats={stats} />

            <div className="row g-4 mt-2">
                {/* 2. COLUMNA IZQUIERDA: TABLA DE VENTAS (Ocupa más espacio) */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0 py-3">
                            <h6 className="mb-0 fw-bold text-secondary">
                                <i className="bi bi-clock-history me-2"></i>Ventas Recientes
                            </h6>
                        </div>
                        <div className="card-body p-0">
                            <VentasTable 
                                ordenes={stats.ultimasVentas || []} 
                                simple={true} 
                                limit={5} 
                            />
                        </div>
                    </div>
                </div>

                {/* 3. COLUMNA DERECHA: GRÁFICOS Y TENDENCIAS (Apilados) */}
                <div className="col-lg-4 d-flex flex-column gap-4">
                    
                    {/* A. Gráfico de Barras (Ingresos) */}
                    <div style={{ minHeight: '300px' }}>
                        <SalesChart ventas={stats.ultimasVentas || []} />
                    </div>

                    {/* B. Tarjeta de Tendencias (Lo más buscado) */}
                    {/* 👇 ELIMINAMOS EL <div> QUE ENVOLVÍA ESTO 👇 */}
                    <TendenciasCard datosGrafico={datosTendencias} /> 

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;