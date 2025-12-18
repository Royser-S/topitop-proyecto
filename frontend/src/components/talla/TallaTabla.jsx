const TallaTabla = ({ tallas, cargarDatosEdicion }) => {
    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-white p-3 border-bottom">
                <h6 className="mb-0 fw-bold text-muted">Listado de Tallas</h6>
            </div>
            <div className="card-body p-0">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="py-3 ps-4">ID</th>
                            <th className="py-3">Valor</th>
                            <th className="py-3 text-end pe-4">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tallas.map((talla) => (
                            <tr key={talla.id}>
                                <td className="ps-4 text-muted">#{talla.id}</td>
                                <td className="fw-bold fs-5">{talla.valor}</td>
                                <td className="text-end pe-4">
                                    <button onClick={() => cargarDatosEdicion(talla)} className="btn btn-sm btn-outline-primary shadow-sm" title="Editar">
                                        <i className="bi bi-pencil-fill me-1"></i> Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tallas.length === 0 && (
                            <tr><td colSpan="3" className="text-center py-4">No hay tallas registradas.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TallaTabla;