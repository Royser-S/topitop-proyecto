import api from './api'; 

const getAll = async () => {
    const response = await api.get('/public/colores'); 
    return response.data;
};

const guardar = async (color) => {
    const response = await api.post('/admin/colores', color);
    return response.data;
};

const remove = async (id) => {
    await api.delete(`/admin/colores/${id}`);
};

export default { getAll, guardar, remove };