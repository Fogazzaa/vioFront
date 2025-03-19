import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: { accept: "application/json" },
});

const sheets = {
  postLogin:(user) => api.post("login/", user),
  postCadastro:(user) => api.post("user/", user),
  getUsers:()=>api.get("user/"),
  getEventos: () => api.get("evento/"),
  getOrganizadores: () => api.get("org/"),
  getIngressos: () => api.get("ing/"),
  postEvento: () => api.get("evento/"),
};

export default sheets;
