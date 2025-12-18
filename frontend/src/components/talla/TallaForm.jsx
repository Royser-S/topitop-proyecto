const TallaForm = ({ handleSubmit, valor, setValor, idEditar, limpiarFormulario, mensaje }) => {
    return (
        <div className="card border-0 shadow-lg rounded-4 p-4">
            <h5 className="mb-3 fw-bold text-secondary">
                {idEditar ? <><i className="bi bi-pencil-square me-2"></i>Editar Talla</> : <><i className="bi bi-plus-circle me-2"></i>Nueva Talla</>}
            </h5>
            
            {mensaje.texto && <div className={`alert alert-${mensaje.tipo} py-2 small`}>{mensaje.texto}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input 
                        type="text" className="form-control rounded-3" id="valorInput" 
                        placeholder="Ej: M" value={valor} onChange={(e) => setValor(e.target.value)} required 
                    />
                    <label htmlFor="valorInput">Valor (Ej: S, M, 42)</label>
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
export default TallaForm;