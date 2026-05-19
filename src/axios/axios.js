import { KeyboardReturnRounded } from "@mui/icons-material";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && error.response.data.auth === false) {
        localStorage.removeItem("token");
        localStorage.setItem("refreshToken",response.data.message);
        window.location.href = "/"
      } else if (
        error.response.status === 403 &&
        error.response.data.auth === false
      ) {
        localStorage.removeItem("token");
        localStorage.setItem("refreshToken", error.response.data.message);
      }
    }
        return Promise.reject(error);
    },
);

const sheets = {
  postLogin: (user) => api.post("/login", user),
  postUser: (user) => api.post("/user", user),
  getUsers: () => api.get("/user"),
  getEvento: () => api.get("/evento"),
  getIngresso: () => api.get("/ingresso"),
  getOrganizador: () => api.get("/organizador"),
  deleteUser: (cpf) => api.delete("/user/" + cpf),
  deleteEvento: (id_evento) => api.delete("/evento/" + id_evento),
  deleteIngresso: (id_ingresso) => api.delete("/ingresso/" + id_ingresso),
  deleteOrganizador: (id_organizador) =>
    api.delete("/organizador/" + id_organizador),
};

export default sheets;
