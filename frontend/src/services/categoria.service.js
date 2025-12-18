import api from './api'; 

const getAll = async () => {
    // Coincide con @GetMapping("/admin/categorias")
    const response = await api.get('/admin/categorias'); 
    return response.data;
};

const guardar = async (categoria) => {
    // Coincide con @PostMapping("/admin/categorias")
    // Tu backend decide si crea o edita según si mandas el ID
    const response = await api.post('/admin/categorias', categoria);
    return response.data;
};

// No ponemos delete ni toggleEstado porque tu Backend NO los tiene
export default { getAll, guardar };