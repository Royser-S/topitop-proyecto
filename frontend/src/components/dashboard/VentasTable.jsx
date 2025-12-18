import React from 'react';

const VentasTable = ({ ventas }) => {
    // Función para los colores de los badges
    const getBadgeClass = (estado) => {
        const colors = { 
            'PAGADO': 'bg-info text-dark', 
            'ENVIADO': 'bg-warning text-dark', 
            'ENTREGADO': 'bg-success', 
            'CANCELADO': 'bg-danger' 
        };
        return `badge ${colors[estado] || 'bg-secondary'}`;
    };

    return (
        <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-transparent py-3">
                <h6 className="mb-0 fw-bold"><i className="bi bi-clock-history me-2"></i>Ventas Recientes</h6>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light small">
                        <tr>
                            <th className="ps-3"># Orden</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas && ventas.length > 0 ? (
                            ventas.map((orden) => (
                                <tr key={orden.id}>
                                    <td className="ps-3 fw-bold text-primary">#{orden.id}</td>
                                    <td className="fw-bold">S/ {orden.total.toFixed(2)}</td>
                                    <td>
                                        <span className={getBadgeClass(orden.estado)}>
                                            {orden.estado}
                                        </span>
                                    </td>
                                    <td className="small text-muted">
                                        {new Date(orden.fecha).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">
                                    No hay transacciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VentasTable;