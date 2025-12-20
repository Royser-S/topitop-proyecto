import api from "./api";

const listarPublicas = async () => {
  const resp = await api.get("/public/marcas"); // ajusta si tu endpoint es otro
  return resp.data;
};

export default { listarPublicas };
