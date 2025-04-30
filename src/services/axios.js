import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.91:5000/api/v1/",
  headers: { accept: "application/json" },
});

const sheets = {
  postLogin:(user) => api.post("login/", user),
  postCadastro:(user) => api.post("user/", user),
  getUsers:()=>api.get("user/"),
  getEventos: () => api.get("eventos/"),
  getOrganizadores: () => api.get("org/"),
  getIngressos: () => api.get("ing/"),
  postEvento: () => api.get("evento/"),
  deleteUser: (id_usuario) => api.delete(`user/${id_usuario}`),
  deleteEvento: (id_evento) => api.delete(`evento/${id_evento}`),
  deleteIngresso: (id_ingresso) => api.delete(`ing/${id_ingresso}`),
  deleteOrganizador: (id_organizador) => api.delete(`org/${id_organizador}`),
  createIngresso: (ingresso) => api.post("/ing", ingresso),
};

export default sheets;
