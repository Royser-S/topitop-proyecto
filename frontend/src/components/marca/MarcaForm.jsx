// QUITAMOS "import React from 'react'" porque ya no es necesario en versiones nuevas

const MarcaForm = ({ 
    handleSubmit, nombre, slug, urlImagen, setUrlImagen, 
    idEditar, limpiarFormulario, mensaje, handleNombreChange 
    // ^^^ AQUÍ BORRÉ "setNombre" PORQUE NO LO USAMOS (Usamos handleNombreChange)
}) => {
    return (
        <div className={`card border-0 shadow-lg rounded-4 overflow-hidden ${idEditar ? 'border border-warning' : ''}`}>
            <div className={`card-header p-3 border-0 ${idEditar ? 'bg-warning text-dark' : 'bg-primary text-white'}`}>
                <h5 className="mb-0 fw-bold">
                    {idEditar ? <><i className="bi bi-pencil-square me-2"></i>Editar Marca</> : <><i className="bi bi-plus-circle me-2"></i>Nueva Marca</>}
                </h5>
            </div>
            <div className="card-body p-4 bg-white">
                
                {mensaje.texto && (
                    <div className={`alert alert-${mensaje.tipo} d-flex align-items-center shadow-sm rounded-3`} role="alert">
                        <i className={`bi ${mensaje.tipo === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2 fs-5`}></i>
                        <div>{mensaje.texto}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input 
                            type="text" className="form-control rounded-3" id="nombreInput"
                            placeholder="Nombre" value={nombre} onChange={handleNombreChange} required
                        />
                        <label htmlFor="nombreInput">Nombre Comercial</label>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small text-muted fw-bold ms-1">IDENTIFICADOR (SLUG)</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                                <i className="bi bi-link-45deg"></i>
                            </span>
                            <input 
                                type="text" className="form-control bg-light text-primary fw-bold border-start-0 rounded-end-3" 
                                value={slug} readOnly placeholder="se-genera-auto"
                            />
                        </div>
                    </div>

                    <div className="form-floating mb-4">
                        <input 
                            type="text" className="form-control rounded-3" id="logoInput"
                            placeholder="URL" value={urlImagen} onChange={(e) => setUrlImagen(e.target.value)}
                        />
                        <label htmlFor="logoInput">URL del Logo (Imagen)</label>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className={`btn py-2 rounded-pill fw-bold shadow-sm ${idEditar ? 'btn-warning' : 'btn-primary'}`}>
                            {idEditar ? <><i className="bi bi-pencil-fill me-2"></i>Actualizar</> : <><i className="bi bi-save2 me-2"></i>Guardar Marca</>}
                        </button>
                        
                        {idEditar && (
                            <button type="button" className="btn btn-outline-secondary py-2 rounded-pill fw-bold" onClick={limpiarFormulario}>
                                Cancelar Edición
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarcaForm;