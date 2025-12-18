const InventarioForm = ({ 
    handleSubmit, form, setForm, 
    tallas, colores, 
    productoSeleccionado,
    limpiarFormulario, mensaje 
}) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (!productoSeleccionado) {
        return <div className="alert alert-info">👈 Selecciona un producto arriba para gestionar su inventario.</div>;
    }

    return (
        <div className="card border-0 shadow-lg rounded-4 p-4 mb-4">
            <h5 className="mb-3 fw-bold text-primary">
                <i className="bi bi-boxes me-2"></i>Gestión de Stock: <span className="text-dark">{productoSeleccionado.nombre}</span>
            </h5>
            
            {mensaje.texto && <div className={`alert alert-${mensaje.tipo} py-2 small`}>{mensaje.texto}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    {/* TALLA */}
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted">Talla</label>
                        <select className="form-select" name="tallaId" value={form.tallaId} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            {tallas.map(t => <option key={t.id} value={t.id}>{t.valor}</option>)}
                        </select>
                    </div>

                    {/* COLOR */}
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted">Color</label>
                        <select className="form-select" name="colorId" value={form.colorId} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            {colores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                        </select>
                    </div>

                    {/* STOCK */}
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted">Cantidad</label>
                        <input 
                            type="number" className="form-control" 
                            name="stock" value={form.stock} onChange={handleChange} 
                            min="0" required 
                        />
                    </div>

                    {/* SKU (Opcional) */}
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted">SKU (Opcional)</label>
                        <input 
                            type="text" className="form-control" placeholder="Auto"
                            name="sku" value={form.sku} onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button type="button" className="btn btn-light" onClick={limpiarFormulario}>Limpiar</button>
                    <button type="submit" className="btn btn-primary fw-bold px-4">
                        <i className="bi bi-save2 me-2"></i>Guardar Stock
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InventarioForm;