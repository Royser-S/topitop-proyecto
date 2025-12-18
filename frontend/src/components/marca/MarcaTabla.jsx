import { useState } from 'react'; // Solo importamos useState, ya no "React"

const MarcaTabla = ({ marcas, handleToggleEstado, cargarDatosEdicion }) => {
    
    const [busqueda, setBusqueda] = useState('');

    const marcasFiltradas = marcas.filter(marca => 
        marca.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        marca.slug.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            
            <div className="card-header bg-white p-3 border-bottom">
                <div className="input-group">
                    <span className="input-group-text bg-light border-0"><i className="bi bi-search"></i></span>
                    <input 
                        type="text" 
                        className="form-control border-0 bg-light" 
                        placeholder="Buscar marca por nombre o slug..."
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
                                <th className="py-3 ps-4 text-secondary text-uppercase small fw-bold">Slug</th>
                                <th className="py-3 text-secondary text-uppercase small fw-bold">Marca</th>
                                <th className="py-3 text-secondary text-uppercase small fw-bold text-center">Estado</th>
                                <th className="py-3 pe-4 text-end text-secondary text-uppercase small fw-bold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marcasFiltradas.length > 0 ? marcasFiltradas.map((marca) => (
                                <tr key={marca.id}>
                                    <td className="ps-4">
                                        <span className="fs-5 fw-bold text-primary font-monospace">{marca.slug}</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-white rounded-circle p-1 border shadow-sm me-3 d-flex justify-content-center align-items-center" style={{width:'45px', height:'45px'}}>
                                                {marca.imagenLogo ? <img src={marca.imagenLogo} alt="logo" className="img-fluid rounded-circle" /> : <i className="bi bi-image text-muted"></i>}
                                            </div>
                                            <div className="fw-bold text-dark">{marca.nombre}</div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {marca.estado ? 
                                            <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success px-3 py-2">ACTIVA</span> : 
                                            <span className="badge rounded-pill bg-secondary bg-opacity-10 text-secondary border border-secondary px-3 py-2">INACTIVA</span>
                                        }
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button onClick={() => cargarDatosEdicion(marca)} className="btn btn-sm btn-outline-primary px-3" title="Editar">
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button onClick={() => handleToggleEstado(marca)} className={`btn btn-sm px-3 ${marca.estado ? 'btn-outline-danger' : 'btn-outline-success'}`} title="Cambiar Estado">
                                                {marca.estado ? <i className="bi bi-power"></i> : <i className="bi bi-lightning-fill"></i>}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        {busqueda ? 'No se encontraron coincidencias.' : 'No hay marcas registradas.'}
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

export default MarcaTabla;