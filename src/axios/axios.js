import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5000/api/v1',
    headers: {
        'accept':'application/json',},
});

const sheets = {
    postLogin: (user) => api.post("/login", user),
    postUSer: (user) => api.post("/user", user),
    getUsers:() => api.get("/user"),
    getEvento: () => api.get("/evento"),
    getIngresso: () => api.get("/ingresso"),
    getOrganizador: () => api.get("/organizador"),
    deleteUser: (cpf) => api.delete("/user/"+cpf),
    deleteEvento: (id_evento) => api.delete("/evento/"+id_evento),
    deleteIngresso: (id_ingresso) => api.delete("/ingresso/"+id_ingresso),
    deleteOrganizador: (id_organizador) => api.delete("/organizador/"+id_organizador),


}


export default sheets;


