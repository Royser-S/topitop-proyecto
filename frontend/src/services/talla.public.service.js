import api from "./api";

const listarPublicas = async () => {
  const resp = await api.get("/public/tallas"); // GET /api/public/tallas
  return resp.data; // [{id, nombre, ...}]
};

export default { listarPublicas };
