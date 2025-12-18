import React from 'react';

const StatsCards = ({ stats }) => {
    return (
        <div className="row g-4 mb-5">
            <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100" style={{ borderLeft: '5px solid #198754' }}>
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small fw-bold">Ingresos</h6>
                        <h3 className="fw-bold mb-0">S/ {stats.totalIngresos?.toFixed(2) || '0.00'}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100" style={{ borderLeft: '5px solid #0d6efd' }}>
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small fw-bold">Ventas</h6>
                        <h3 className="fw-bold mb-0">{stats.cantidadVentas || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100" style={{ borderLeft: '5px solid #ffc107' }}>
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small fw-bold">Stock Total</h6>
                        <h3 className="fw-bold mb-0">{stats.totalPrendas || 0}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100" style={{ borderLeft: stats.productosBajoStock > 0 ? '5px solid #dc3545' : '5px solid #198754' }}>
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small fw-bold">Alerta Stock</h6>
                        <h3 className={`fw-bold mb-0 ${stats.productosBajoStock > 0 ? 'text-danger' : 'text-success'}`}>{stats.productosBajoStock || 0}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;