const CategoriaForm = ({ 
    handleSubmit, nombre, setNombre, 
    descripcion, setDescripcion,
    imagenUrl, setImagenUrl,
    idEditar, limpiarFormulario, mensaje 
}) => {
    return (
        <div className={`card border-0 shadow-lg rounded-4 overflow-hidden ${idEditar ? 'border border-warning' : ''}`}>
            <div className={`card-header p-3 border-0 ${idEditar ? 'bg-warning text-dark' : 'bg-primary text-white'}`}>
                <h5 className="mb-0 fw-bold">
                    {idEditar ? <><i className="bi bi-pencil-square me-2"></i>Editar Categoría</> : <><i className="bi bi-plus-circle me-2"></i>Nueva Categoría</>}
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
                    {/* NOMBRE */}
                    <div className="form-floating mb-3">
                        <input 
                            type="text" className="form-control rounded-3" id="nombreCatInput"
                            placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required
                        />
                        <label htmlFor="nombreCatInput">Nombre</label>
                    </div>

                    {/* DESCRIPCIÓN (Tu Java lo tiene) */}
                    <div className="form-floating mb-3">
                        <textarea 
                            className="form-control rounded-3" placeholder="Desc" id="descInput" style={{height: '100px'}}
                            value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                        <label htmlFor="descInput">Descripción</label>
                    </div>

                    {/* IMAGEN URL */}
                    <div className="form-floating mb-4">
                        <input 
                            type="text" className="form-control rounded-3" id="imgCatInput"
                            placeholder="URL" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)}
                        />
                        <label htmlFor="imgCatInput">URL de la Imagen</label>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className={`btn py-2 rounded-pill fw-bold shadow-sm ${idEditar ? 'btn-warning' : 'btn-primary'}`}>
                            {idEditar ? <><i className="bi bi-pencil-fill me-2"></i>Actualizar</> : <><i className="bi bi-save2 me-2"></i>Guardar Categoría</>}
                        </button>
                        
                        {idEditar && (
                            <button type="button" className="btn btn-outline-secondary py-2 rounded-pill fw-bold" onClick={limpiarFormulario}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoriaForm;