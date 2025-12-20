import api from "./api";

const listarMenu = async () => {
  const resp = await api.get("/public/categorias/menu");
  return resp.data;
};

export default { listarMenu };
