import api from './api'; 

const getAll = async () => {
    // NUEVO: Trae todo el stock de la tienda
    const response = await api.get('/admin/inventario'); 
    return response.data;
};

const getPorProducto = async (productoId) => {
    const response = await api.get(`/public/inventario/${productoId}`); 
    return response.data;
};

const guardar = async (inventario) => {
    const response = await api.post('/admin/inventario', inventario);
    return response.data;
};

export default { getAll, getPorProducto, guardar };