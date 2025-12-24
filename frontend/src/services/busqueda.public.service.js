import axios from "axios";

// Si usas una variable de entorno es mejor: process.env.REACT_APP_API_URL
const API_URL = "http://localhost:8080/api/public/busqueda";

const busquedaService = {
  // GET: Obtener tendencias
  obtenerTendencias: async () => {
    try {
      const response = await axios.get(`${API_URL}/tendencias`);
      // Retornamos directamente los datos (el array de strings)
      return response.data;
    } catch (error) {
      console.error("Error en obtenerTendencias:", error);
      throw error; // Re-lanzamos para que el componente pueda mostrar una alerta si desea
    }
  },

  // POST: Registrar nueva búsqueda
  registrarBusqueda: async (termino) => {
    try {
      // Usamos encodeURIComponent para manejar caracteres especiales o espacios en el término
      const response = await axios.post(`${API_URL}/registrar?termino=${encodeURIComponent(termino)}`);
      return response.data;
    } catch (error) {
      console.error("Error en registrarBusqueda:", error);
      throw error;
    }
  }
};

export default busquedaService;