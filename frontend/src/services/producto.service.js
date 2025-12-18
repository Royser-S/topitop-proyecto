import api from './api'; 

const getAll = async () => {
    // CAMBIO IMPORTANTE: Ahora llamamos a /admin/productos
    // Esto traerá los activos (estado: true) y los inactivos (estado: false)
    const response = await api.get('/admin/productos'); 
    return response.data;
};

const guardar = async (producto) => {
    if (producto.id) {
        const response = await api.put('/admin/productos', producto);
        return response.data;
    } else {
        const response = await api.post('/admin/productos', producto);
        return response.data;
    }
};

const toggleEstado = async (id) => {
    const response = await api.put(`/admin/productos/${id}/estado`);
    return response.data;
};

// Eliminamos "eliminar" porque usamos toggleEstado
export default { getAll, guardar, toggleEstado };