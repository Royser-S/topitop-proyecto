import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TendenciasCard = ({ datosGrafico }) => { 
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent py-3">
                <h6 className="mb-0 fw-bold">
                    <i className="bi bi-graph-up-arrow text-primary me-2"></i>
                    Análisis de Búsquedas
                </h6>
            </div>
            <div className="card-body" style={{ height: '250px' }}>
                {datosGrafico && datosGrafico.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={datosGrafico} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} style={{ fontSize: '10px' }} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="busquedas" radius={[0, 4, 4, 0]}>
                                {datosGrafico.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0d6efd' : '#6c757d'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center py-5 text-muted small">Sin datos aún</div>
                )}
            </div>
        </div>
    );
};

export default TendenciasCard;