const ProductoForm = ({ 
    handleSubmit, form, setForm, 
    marcas, categorias, 
    idEditar, limpiarFormulario, mensaje 
}) => {

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className="card border-0 shadow-lg rounded-4 p-4">
            <div className={`card-header border-0 bg-white p-0 mb-3`}>
                <h5 className="mb-0 fw-bold text-primary">
                    {idEditar ? <><i className="bi bi-pencil-square me-2"></i>Editar Producto</> : <><i className="bi bi-plus-circle me-2"></i>Nuevo Producto</>}
                </h5>
            </div>
            
            {mensaje.texto && <div className={`alert alert-${mensaje.tipo} py-2 small shadow-sm`}>{mensaje.texto}</div>}

            <form onSubmit={handleSubmit}>
                {/* 1. DATOS PRINCIPALES */}
                <div className="form-floating mb-3">
                    <input 
                        type="text" className="form-control rounded-3" id="nomProd" 
                        name="nombre" value={form.nombre} onChange={handleChange} required 
                        placeholder="Nombre"
                    />
                    <label htmlFor="nomProd">Nombre del Producto</label>
                </div>

                <div className="row g-2 mb-3">
                    <div className="col-md-6 form-floating">
                        <input 
                            type="number" className="form-control rounded-3" id="precioProd" 
                            name="precio" value={form.precio} onChange={handleChange} required step="0.01" 
                            placeholder="0.00"
                        />
                        <label htmlFor="precioProd">Precio (S/)</label>
                    </div>
                    <div className="col-md-6 form-floating">
                        <input 
                            type="number" className="form-control rounded-3" id="descProd" 
                            name="precioDescuento" value={form.precioDescuento} onChange={handleChange} step="0.01" 
                            placeholder="0.00"
                        />
                        <label htmlFor="descProd">Precio Oferta (Opcional)</label>
                    </div>
                </div>

                <div className="row g-2 mb-3">
                    <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Marca</label>
                        <select className="form-select" name="marcaId" value={form.marcaId} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Categoría</label>
                        <select className="form-select" name="categoriaId" value={form.categoriaId} onChange={handleChange} required>
                            <option value="">Seleccione...</option>
                            {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Descripción</label>
                    <textarea 
                        className="form-control" name="descripcion" rows="2" 
                        value={form.descripcion} onChange={handleChange} required 
                    ></textarea>
                </div>

                {/* CAMPO DE IMÁGENES */}
                <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">
                        <i className="bi bi-images me-1"></i> Imágenes del Producto
                    </label>
                    <textarea 
                        className="form-control" 
                        name="imagenesTexto" 
                        rows="3" 
                        value={form.imagenesTexto} 
                        onChange={handleChange} 
                        placeholder="Pega las URLs separadas por comas. Ej: https://img1.jpg, https://img2.jpg" 
                    />
                    <div className="form-text small">
                        Se mostrarán en carrusel. La primera será la portada.
                    </div>
                </div>

                <div className="form-check form-switch mb-4">
                    <input className="form-check-input" type="checkbox" name="destacado" id="destacadoCheck" checked={form.destacado} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="destacadoCheck">Destacar en la portada</label>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className={`btn fw-bold py-2 shadow-sm ${idEditar ? 'btn-warning' : 'btn-primary'}`}>
                        {idEditar ? 'Actualizar Producto' : 'Guardar Producto'}
                    </button>
                    
                    {/* AQUÍ ESTABA EL ERROR: Quitamos las barras invertidas \ */}
                    {idEditar && (
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={limpiarFormulario}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductoForm;