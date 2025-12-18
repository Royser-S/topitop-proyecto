import React from 'react';

const VentasTabla = ({ ordenes, onVerDetalle, onCambiarEstado }) => {

    // Función auxiliar para los colores
    const getBadgeColor = (estado) => {
        switch (estado) {
            case 'PAGADO': return 'bg-info text-dark';
            case 'ENVIADO': return 'bg-warning text-dark';
            case 'ENTREGADO': return 'bg-success';
            case 'CANCELADO': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-white p-3">
                <h6 className="mb-0 fw-bold text-muted">Bandeja de Entrada de Pedidos</h6>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4"># Orden</th>
                            <th>Fecha</th>
                            <th>Cliente / Envío</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th className="text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden => (
                            <tr key={orden.id}>
                                <td className="ps-4 fw-bold text-primary">#{orden.id}</td>
                                <td>
                                    <div>{new Date(orden.fecha).toLocaleDateString()}</div>
                                    <small className="text-muted">{new Date(orden.fecha).toLocaleTimeString()}</small>
                                </td>
                                <td>
                                    <div className="fw-bold text-dark">{orden.direccionEnvio}</div>
                                    <small className="text-muted">Lima, PE</small>
                                </td>
                                <td className="fw-bold text-success">S/ {orden.total.toFixed(2)}</td>
                                <td><span className={`badge ${getBadgeColor(orden.estado)}`}>{orden.estado}</span></td>
                                <td className="text-end pe-4">
                                    <button 
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => onVerDetalle(orden)}
                                        title="Ver Detalle"
                                    >
                                        <i className="bi bi-eye-fill"></i> Ver
                                    </button>
                                    
                                    {/* BOTONES RÁPIDOS */}
                                    {orden.estado === 'PAGADO' && (
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => onCambiarEstado(orden.id, 'ENVIADO')} title="Marcar Enviado">
                                            <i className="bi bi-truck"></i>
                                        </button>
                                    )}
                                    {orden.estado === 'ENVIADO' && (
                                        <button className="btn btn-sm btn-outline-success" onClick={() => onCambiarEstado(orden.id, 'ENTREGADO')} title="Marcar Entregado">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {ordenes.length === 0 && (
                            <tr><td colSpan="6" className="text-center py-5 text-muted">No hay ventas registradas aún.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VentasTabla;