import { useState } from 'react';

const CategoriaTabla = ({ categorias, cargarDatosEdicion }) => {
    
    const [busqueda, setBusqueda] = useState('');

    const categoriasFiltradas = categorias.filter(cat => 
        cat.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* BUSCADOR */}
            <div className="card-header bg-white p-3 border-bottom">
                <div className="input-group">
                    <span className="input-group-text bg-light border-0"><i className="bi bi-search"></i></span>
                    <input 
                        type="text" className="form-control border-0 bg-light" 
                        placeholder="Buscar categoría por nombre..."
                        value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 ps-4 text-secondary small fw-bold">ID</th>
                                <th className="py-3 text-secondary small fw-bold">Imagen</th>
                                <th className="py-3 text-secondary small fw-bold">Nombre</th>
                                <th className="py-3 text-secondary small fw-bold">Descripción</th>
                                <th className="py-3 pe-4 text-end text-secondary small fw-bold">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoriasFiltradas.length > 0 ? categoriasFiltradas.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="ps-4 text-muted fw-bold">#{cat.id}</td>
                                    
                                    <td className="py-3">
                                        <div className="bg-white rounded-3 p-1 border shadow-sm d-flex justify-content-center align-items-center" style={{width:'50px', height:'50px'}}>
                                            {/* Usamos 'imagenUrl' tal cual está en tu Java */}
                                            {cat.imagenUrl ? (
                                                <img src={cat.imagenUrl} alt="cat" className="img-fluid rounded" style={{maxHeight:'100%'}} />
                                            ) : (
                                                <i className="bi bi-image text-muted"></i>
                                            )}
                                        </div>
                                    </td>

                                    <td className="fw-bold text-dark">{cat.nombre}</td>
                                    
                                    <td className="small text-muted text-truncate" style={{maxWidth: '200px'}}>
                                        {cat.descripcion || '-'}
                                    </td>
                                    
                                    <td className="text-end pe-4">
                                        <button onClick={() => cargarDatosEdicion(cat)} className="btn btn-sm btn-outline-primary px-3 rounded-pill" title="Editar">
                                            <i className="bi bi-pencil-fill me-1"></i> Editar
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        {busqueda ? 'No se encontraron coincidencias.' : 'No hay categorías registradas.'}
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

export default CategoriaTabla;