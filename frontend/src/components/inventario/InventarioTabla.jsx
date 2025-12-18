const InventarioTabla = ({ inventario, cargarDatosEdicion }) => {
    return (
        <div className="card border-0 shadow-sm mt-4 overflow-hidden rounded-4">
            <div className="card-header bg-light p-3 border-bottom d-flex justify-content-between">
                <h6 className="mb-0 fw-bold text-muted">📦 Inventario Global</h6>
                <span className="badge bg-secondary">{inventario.length} registros</span>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">SKU</th>
                                <th>Producto / Marca</th>
                                <th>Variante</th>
                                <th className="text-center">Stock</th>
                                <th className="text-end pe-4">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventario.map((item) => {
                                // Lógica para detectar problemas de visibilidad
                                const problemaMarca = item.marcaActiva === false; // Si es false, hay problema
                                const problemaProducto = item.productoActivo === false;
                                const tieneAlerta = problemaMarca || problemaProducto;

                                return (
                                    <tr key={item.id} className={tieneAlerta ? "table-warning bg-opacity-25" : ""}>
                                        {/* SKU */}
                                        <td className="ps-4 font-monospace small text-primary">{item.sku}</td>
                                        
                                        {/* NOMBRE Y ALERTAS */}
                                        <td>
                                            <div className="fw-bold text-dark">{item.nombreProducto}</div>
                                            <div className="small text-muted mb-1">{item.nombreMarca}</div>

                                            {/* Si la MARCA está desactivada */}
                                            {problemaMarca && (
                                                <span className="badge bg-danger me-1 shadow-sm">
                                                    <i className="bi bi-exclamation-triangle-fill me-1"></i> Marca Off
                                                </span>
                                            )}

                                            {/* Si el PRODUCTO está desactivado */}
                                            {problemaProducto && (
                                                <span className="badge bg-secondary shadow-sm">
                                                    <i className="bi bi-power me-1"></i> Producto Off
                                                </span>
                                            )}
                                        </td>

                                        {/* VARIANTE (Talla/Color) */}
                                        <td>
                                            <span className="badge bg-light text-dark border me-1">{item.nombreTalla}</span>
                                            <span className="small text-muted">{item.nombreColor}</span>
                                        </td>

                                        {/* STOCK */}
                                        <td className="text-center">
                                            <span className={`badge rounded-pill ${item.stock > 5 ? 'bg-success' : item.stock > 0 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                                {item.stock} unids.
                                            </span>
                                        </td>

                                        {/* BOTÓN EDITAR */}
                                        <td className="text-end pe-4">
                                            <button 
                                                onClick={() => cargarDatosEdicion(item)} 
                                                className="btn btn-sm btn-outline-primary shadow-sm"
                                                title="Editar Stock"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            
                            {inventario.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No hay inventario registrado. ¡Selecciona un producto arriba y agrega stock!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventarioTabla;