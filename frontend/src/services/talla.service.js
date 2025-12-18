import api from './api'; 

const getAll = async () => {
    const response = await api.get('/public/tallas'); 
    return response.data;
};

const guardar = async (talla) => {
    const response = await api.post('/admin/tallas', talla);
    return response.data;
};

const remove = async (id) => {
    await api.delete(`/admin/tallas/${id}`);
};

export default { getAll, guardar, remove };