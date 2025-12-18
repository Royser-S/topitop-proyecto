import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = ({ ventas }) => {
    // 1. Procesamos los datos reales para el gráfico
    const procesarDatos = () => {
        if (!ventas || ventas.length === 0) return [];

        // Agrupar ventas por fecha (DD/MM)
        const agrpupado = ventas.reduce((acc, venta) => {
            const fechaObj = new Date(venta.fecha);
            const fechaKey = fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
            
            if (!acc[fechaKey]) acc[fechaKey] = 0;
            acc[fechaKey] += venta.total;
            return acc;
        }, {});

        // Convertir a formato que usa Recharts: [{name: '17/12', total: 700}, ...]
        return Object.keys(agrpupado).map(key => ({
            name: key,
            total: agrpupado[key]
        }));
    };

    const data = procesarDatos();

    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
                <h6 className="mb-0 fw-bold text-secondary">
                    <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
                    Tendencia de Ingresos
                </h6>
            </div>
            <div className="card-body" style={{ height: '300px' }}>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#6c757d', fontSize: 12}}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#6c757d', fontSize: 12}}
                                tickFormatter={(value) => `S/${value}`}
                            />
                            <Tooltip 
                                cursor={{fill: '#f8f9fa'}}
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                                formatter={(value) => [`S/ ${value.toFixed(2)}`, 'Ingresos']}
                            />
                            <Bar 
                                dataKey="total" 
                                fill="#0D6EFD" 
                                radius={[4, 4, 0, 0]} 
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                        <i className="bi bi-graph-down fs-1 mb-2"></i>
                        <small>No hay datos suficientes para graficar</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesChart;