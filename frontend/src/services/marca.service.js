import api from './api'; 

const getAll = async () => {
    const response = await api.get('/admin/marcas'); 
    return response.data;
};

const getActivas = async () => {
    const response = await api.get('/public/marcas'); 
    return response.data;
};

const create = async (marca) => {
    const response = await api.post('/admin/marcas', marca);
    return response.data;
};

// --- AGREGADO: ACTUALIZAR ---
const update = async (marca) => {
    // El backend espera un PUT a /admin/marcas con el objeto completo (incluyendo ID)
    const response = await api.put('/admin/marcas', marca);
    return response.data;
};

const remove = async (id) => {
    await api.delete(`/admin/marcas/${id}`);
};

const toggleEstado = async (id) => {
    const response = await api.put(`/admin/marcas/${id}/estado`);
    return response.data;
};

export default {
    getAll,
    getActivas,
    create,
    update, // <--- NO OLVIDES AGREGAR ESTO AQUÍ
    remove,
    toggleEstado
};