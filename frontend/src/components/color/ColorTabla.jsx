const ColorTabla = ({ colores, cargarDatosEdicion }) => {
    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-white p-3 border-bottom">
                <h6 className="mb-0 fw-bold text-muted">Paleta de Colores</h6>
            </div>
            <div className="card-body p-0">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-4">Color</th>
                            <th className="py-3">Nombre</th>
                            <th className="py-3">Código</th>
                            <th className="py-3 text-end pe-4">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colores.map((color) => (
                            <tr key={color.id}>
                                <td className="ps-4">
                                    <div className="rounded-circle border shadow-sm" 
                                         style={{ width: '35px', height: '35px', backgroundColor: color.codigoHex }}>
                                    </div>
                                </td>
                                <td className="fw-bold">{color.nombre}</td>
                                <td className="font-monospace text-muted small">{color.codigoHex}</td>
                                <td className="text-end pe-4">
                                    <button onClick={() => cargarDatosEdicion(color)} className="btn btn-sm btn-outline-primary shadow-sm" title="Editar">
                                        <i className="bi bi-pencil-fill me-1"></i> Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {colores.length === 0 && <tr><td colSpan="4" className="text-center py-4">Sin colores.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ColorTabla;