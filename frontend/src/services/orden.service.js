import api from './api'; 

// ADMIN: Obtener todas las ventas
const getAllOrdenes = async () => {
    const response = await api.get('/admin/ordenes');
    return response.data;
};

// ADMIN: Cambiar estado (PAGADO -> ENVIADO -> ENTREGADO)
const cambiarEstado = async (ordenId, nuevoEstado) => {
    // Enviamos el nuevoEstado como parámetro en la URL query (?nuevoEstado=...)
    const response = await api.put(`/admin/ordenes/${ordenId}/estado`, null, { 
        params: { nuevoEstado } 
    });
    return response.data;
};

// CLIENTE: Ver mis compras (lo usaremos luego, pero dejémoslo listo)
const getMisOrdenes = async () => {
    const response = await api.get('/cliente/ordenes/mis-compras');
    return response.data;
};

export default { getAllOrdenes, cambiarEstado, getMisOrdenes };