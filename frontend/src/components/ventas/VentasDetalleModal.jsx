import React from 'react';
import { generarBoletaPDF } from '../../utils/pdfGenerator'; // <--- IMPORTAMOS PDF

const VentasDetalleModal = ({ orden, onClose, onCambiarEstado }) => {
    if (!orden) return null;

    // --- HELPER PARA BADGES ---
    const getEstadoBadge = (estado) => {
        switch (estado) {
            case 'PAGADO': return <span className="badge bg-info text-dark">PAGADO</span>;
            case 'ENVIADO': return <span className="badge bg-warning text-dark">ENVIADO</span>;
            case 'ENTREGADO': return <span className="badge bg-success">ENTREGADO</span>;
            case 'CANCELADO': return <span className="badge bg-danger">CANCELADO</span>;
            default: return <span className="badge bg-secondary">{estado}</span>;
        }
    };

    const handleSelectChange = (e) => {
        const nuevoEstado = e.target.value;
        onCambiarEstado(orden.id, nuevoEstado);
    };

    const esCancelado = orden.estado === 'CANCELADO';

    return (
        // Fondo oscuro para el modal
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                        
                        {/* CABECERA */}
                        <div className="modal-header bg-light">
                            <div>
                                <h5 className="modal-title fw-bold">Orden #{orden.id}</h5>
                                <small className="text-muted">{new Date(orden.fecha).toLocaleString()}</small>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                {getEstadoBadge(orden.estado)}
                                <button type="button" className="btn-close" onClick={onClose}></button>
                            </div>
                        </div>

                        {/* CUERPO */}
                        <div className="modal-body p-4">
                            <h6 className="text-muted small fw-bold mb-3 text-uppercase">📦 Contenido del Pedido:</h6>
                            
                            {/* LISTA DE PRODUCTOS */}
                            <div className="list-group mb-4 shadow-sm">
                                {orden.detalles.map((item, idx) => (
                                    <div key={idx} className="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom">
                                        <div>
                                            {/* CORRECCIÓN DE ACCESO A DATOS: Usamos el operador ?. para seguridad */}
                                            <div className="fw-bold text-dark">
                                                {item.nombreProducto || item.producto?.nombre || 'Producto Desconocido'}
                                            </div>
                                            <small className="text-muted">
                                                {item.cantidad} unids. x S/ {item.precioUnitario?.toFixed(2)}
                                                {/* Mostramos Talla/Color si existen */}
                                                {(item.talla || item.nombreTalla) && 
                                                    <span className="ms-2 badge bg-light text-dark border">
                                                        {item.nombreTalla || item.talla?.valor} - {item.nombreColor || item.color?.nombre}
                                                    </span>
                                                }
                                            </small>
                                        </div>
                                        <div className="fw-bold text-end">
                                            S/ {(item.subtotal || (item.cantidad * item.precioUnitario)).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                                
                                {/* TOTAL */}
                                <div className="list-group-item d-flex justify-content-between align-items-center bg-light fw-bold">
                                    <span>TOTAL:</span>
                                    <span className="text-primary fs-5">S/ {orden.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="row g-3">
                                {/* DIRECCIÓN */}
                                <div className="col-md-7">
                                    <div className="p-3 bg-light rounded-3 border h-100">
                                        <h6 className="small fw-bold text-muted mb-2">📍 DIRECCIÓN DE ENVÍO:</h6>
                                        <p className="mb-0 fw-bold">{orden.direccionEnvio || 'Dirección no especificada'}</p>
                                        <small className="text-muted">Lima, Perú</small>
                                        
                                        {/* --- BOTÓN PDF INTEGRADO AQUÍ --- */}
                                        <div className="mt-3 pt-3 border-top">
                                            <button 
                                                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                                                onClick={() => generarBoletaPDF(orden)}
                                            >
                                                <i className="bi bi-file-earmark-pdf-fill"></i>
                                                Descargar Boleta PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* PANEL DE CONTROL (CAMBIAR ESTADO) */}
                                <div className="col-md-5">
                                    <div className={`p-3 border rounded-3 h-100 shadow-sm ${esCancelado ? 'bg-danger bg-opacity-10 border-danger' : 'bg-white'}`}>
                                        <label className="form-label fw-bold small text-muted">
                                            {esCancelado ? '🔒 PEDIDO CERRADO' : '📝 CAMBIAR ESTADO:'}
                                        </label>
                                        
                                        <select 
                                            className="form-select form-select-lg mb-2 fw-bold" 
                                            value={orden.estado}
                                            onChange={handleSelectChange}
                                            style={{ borderColor: esCancelado ? '#dc3545' : '#0d6efd' }}
                                            disabled={esCancelado}
                                        >
                                            <option value="PAGADO">🔵 PAGADO</option>
                                            <option value="ENVIADO">🟡 ENVIADO</option>
                                            <option value="ENTREGADO">🟢 ENTREGADO</option>
                                            <option value="CANCELADO">🔴 CANCELADO</option>
                                        </select>

                                        {esCancelado ? (
                                            <small className="text-danger fw-bold d-block lh-sm">
                                                <i className="bi bi-lock-fill me-1"></i>
                                                Este pedido fue cancelado.
                                            </small>
                                        ) : (
                                            <small className="text-muted d-block lh-sm">
                                                <i className="bi bi-info-circle me-1"></i>
                                                Selecciona para actualizar.
                                            </small>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VentasDetalleModal;