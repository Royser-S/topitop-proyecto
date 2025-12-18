// Archivo: src/services/dashboard.service.js
import api from './api';

const getResumen = async (inicio = null, fin = null) => {
    // Si hay fechas, las enviamos como params en la URL
    const params = {};
    if (inicio && fin) {
        params.inicio = inicio;
        params.fin = fin;
    }
    const response = await api.get('/admin/dashboard/resumen', { params });
    return response.data;
};

const getTendencias = async () => {
    const response = await api.get('/public/busqueda/tendencias'); 
    return response.data;
};

export default { getResumen, getTendencias };