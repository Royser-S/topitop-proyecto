import api from "./api";

const listarPublicos = async () => {
  try {
    const response = await api.get("/public/productos");
    return response.data;
  } catch (error) {
    console.error("Error al listar productos públicos", error);
    throw error;
  }
};

export default {
  listarPublicos,
};
