const ProductoForm = ({ 
    handleSubmit, form, setForm, 
    marcas, categorias, 
    idEditar, limpiarFormulario, mensaje 
}) => {

    // Función genérica para manejar los cambios en los inputs
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
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input 
                                type="number" step="0.01" className="form-control" id="precioProd"
                                name="precio" value={form.precio} onChange={handleChange} required 
                                placeholder="0.00"
                            />
                            <label htmlFor="precioProd">Precio (S/)</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input 
                                type="number" step="0.01" className="form-control" id="precioDesc"
                                name="precioDescuento" value={form.precioDescuento} onChange={handleChange} 
                                placeholder="0.00"
                            />
                            <label htmlFor="precioDesc">Precio Oferta (Opcional)</label>
                        </div>
                    </div>
                </div>

                {/* 2. CLASIFICACIÓN (Selects) */}
                <div className="row g-2 mb-3">
                    <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Marca</label>
                        <select className="form-select py-2" name="marcaId" value={form.marcaId} onChange={handleChange} required>
                            <option value="">-- Seleccionar --</option>
                            {marcas.map(m => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Categoría</label>
                        <select className="form-select py-2" name="categoriaId" value={form.categoriaId} onChange={handleChange} required>
                            <option value="">-- Seleccionar --</option>
                            {categorias.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 3. DETALLES */}
                <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Descripción</label>
                    <textarea className="form-control" rows="3" name="descripcion" value={form.descripcion} onChange={handleChange}></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">URLs de Imágenes (Separadas por comas)</label>
                    <input 
                        type="text" className="form-control" name="imagenesTexto" 
                        value={form.imagenesTexto} onChange={handleChange} 
                        placeholder="https://img1.jpg, https://img2.jpg" 
                    />
                    <div className="form-text small">Copia y pega las URLs de tus imágenes aquí.</div>
                </div>

                <div className="form-check form-switch mb-4">
                    <input className="form-check-input" type="checkbox" name="destacado" id="destacadoCheck" checked={form.destacado} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="destacadoCheck">Destacar en la portada</label>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className={`btn fw-bold py-2 shadow-sm ${idEditar ? 'btn-warning' : 'btn-primary'}`}>
                        {idEditar ? 'Actualizar Producto' : 'Guardar Producto'}
                    </button>
                    {idEditar && <button type="button" className="btn btn-outline-secondary btn-sm" onClick={limpiarFormulario}>Cancelar</button>}
                </div>
            </form>
        </div>
    );
};

export default ProductoForm;