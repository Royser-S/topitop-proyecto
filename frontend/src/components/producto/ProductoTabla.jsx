import { useState } from 'react'; // <--- IMPORTANTE: Agregamos useState

const ProductoTabla = ({ productos, cargarDatosEdicion, handleToggleEstado }) => {
    
    // 1. Estado para el buscador
    const [busqueda, setBusqueda] = useState('');

    // 2. Lógica de filtrado (Busca por Nombre, Marca o Categoría)
    const productosFiltrados = productos.filter(prod => 
        prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        (prod.nombreMarca && prod.nombreMarca.toLowerCase().includes(busqueda.toLowerCase())) ||
        (prod.nombreCategoria && prod.nombreCategoria.toLowerCase().includes(busqueda.toLowerCase()))
    );

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-white p-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-bold text-muted">Inventario de Productos</h6>
                    <span className="badge bg-primary rounded-pill">{productosFiltrados.length} items</span>
                </div>
                
                {/* 3. INPUT DEL BUSCADOR */}
                <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light border-0"><i className="bi bi-search"></i></span>
                    <input 
                        type="text" 
                        className="form-control border-0 bg-light" 
                        placeholder="Buscar por nombre, marca o categoría..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 ps-4">Producto</th>
                                <th className="py-3">Categoría / Marca</th>
                                <th className="py-3">Precio</th>
                                <th className="py-3 text-center">Estado</th>
                                <th className="py-3 text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 4. USAMOS LA LISTA FILTRADA PARA MOSTRAR */}
                            {productosFiltrados.length > 0 ? productosFiltrados.map((prod) => (
                                <tr key={prod.id} className={!prod.estado ? "table-secondary bg-opacity-10" : ""}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-white rounded p-1 border me-3 d-flex align-items-center justify-content-center" style={{width:'50px', height:'50px', overflow:'hidden'}}>
                                                {prod.imagenes && prod.imagenes.length > 0 ? (
                                                    <img src={prod.imagenes[0]} alt="prod" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
                                                ) : (
                                                    <i className="bi bi-box-seam text-muted fs-4"></i>
                                                )}
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark text-truncate" style={{maxWidth: '180px'}} title={prod.nombre}>{prod.nombre}</div>
                                                <small className="text-muted d-block text-truncate" style={{maxWidth: '150px'}}>{prod.descripcion}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small fw-bold text-primary">{prod.nombreCategoria || '-'}</div>
                                        <div className="small text-muted">{prod.nombreMarca || '-'}</div>
                                    </td>
                                    <td>
                                        <div className="fw-bold">S/ {prod.precio}</div>
                                        {prod.precioDescuento > 0 && (
                                            <small className="text-danger fw-bold badge bg-danger bg-opacity-10">- S/ {prod.precioDescuento}</small>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {prod.estado ? 
                                            <span className="badge bg-success bg-opacity-10 text-success border border-success px-2">ACTIVO</span> : 
                                            <span className="badge bg-secondary text-white px-2">INACTIVO</span>
                                        }
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button onClick={() => cargarDatosEdicion(prod)} className="btn btn-sm btn-outline-primary px-3" title="Editar">
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleToggleEstado(prod)} 
                                                className={`btn btn-sm px-3 ${prod.estado ? 'btn-outline-danger' : 'btn-outline-success'}`} 
                                                title={prod.estado ? "Desactivar" : "Activar"}
                                            >
                                                {prod.estado ? <i className="bi bi-power"></i> : <i className="bi bi-lightning-fill"></i>}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        {busqueda ? 'No se encontraron coincidencias.' : 'No hay productos registrados.'}
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

export default ProductoTabla;