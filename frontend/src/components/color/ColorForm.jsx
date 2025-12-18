const ColorForm = ({ handleSubmit, nombre, setNombre, codigoHex, setCodigoHex, idEditar, limpiarFormulario, mensaje }) => {
    return (
        <div className="card border-0 shadow-lg rounded-4 p-4">
            <h5 className="mb-3 fw-bold text-secondary">
                {idEditar ? 'Editar Color' : 'Nuevo Color'}
            </h5>
            
            {mensaje.texto && <div className={`alert alert-${mensaje.tipo} py-2 small`}>{mensaje.texto}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label small fw-bold">Nombre</label>
                    <input type="text" className="form-control" placeholder="Ej: Rojo Pasión" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                
                <div className="mb-4">
                    <label className="form-label small fw-bold">Seleccionar Color</label>
                    <div className="d-flex gap-2">
                        {/* Selector visual */}
                        <input type="color" className="form-control form-control-color" value={codigoHex} onChange={(e) => setCodigoHex(e.target.value)} title="Elige un color" />
                        {/* Input de texto para ver el código */}
                        <input type="text" className="form-control font-monospace text-uppercase" value={codigoHex} onChange={(e) => setCodigoHex(e.target.value)} maxLength={7} />
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className={`btn fw-bold py-2 ${idEditar ? 'btn-warning' : 'btn-dark'}`}>
                        {idEditar ? 'Actualizar' : 'Guardar'}
                    </button>
                    {idEditar && <button type="button" className="btn btn-light btn-sm" onClick={limpiarFormulario}>Cancelar</button>}
                </div>
            </form>
        </div>
    );
};
export default ColorForm;