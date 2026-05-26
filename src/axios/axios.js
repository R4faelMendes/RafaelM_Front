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
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if(response.data.userDelete){
        localStorage.removeItem("token");
        localStorage.setItem("refreshToken", response.data.message);
        window.location.href = "/";
    }
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && error.response.data.auth === false) {
        localStorage.removeItem("token");
        localStorage.setItem("refreshToken", error.response.data.message);
        window.location.href = "/";
      } else if (
        error.response.status === 403 &&
        error.response.data.auth === false
      ) {
        localStorage.removeItem("token");
        localStorage.setItem("refreshToken", error.response.data.message);
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

const sheets = {
  postLogin: (user) => api.post("/login", user),
  postCadastro: (user) => api.post("/user", user),
  getUsers: () => api.get("/user"),
  getOrganizadores: () => api.get("/organizador"),
  getEventos: () => api.get("/evento"),
  getIngressos: () => api.get("/ingresso"),

  deleteUser: (cpf) => api.delete("/user/" + cpf),
  deleteOrganizador: (id_organizador) =>
    api.delete("/organizador/" + id_organizador),
  deleteIngresso: (id_ingresso) => api.delete("/ingresso/" + id_ingresso),
  deleteEvento: (id_evento) => api.delete("/evento/" + id_evento),

  createEvento: (form, imagem) => {
    const data = new FormData()
    for(let key in form) data.append(key, form[key]);
    if(imagem) data.append("imagem", imagem);

    return api.post("/evento", data, {
      headers:{
        "Content-Type":"multipart/form-data",
        Accept: "application/json"
      }
    });
  }
};

export default sheets;
