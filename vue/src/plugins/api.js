import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/pt-BR',
});

api.interceptors.request.use(
  (cfg) => {
    const config = cfg;
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
);

const apiPlugin = {
  install(Vue) {
    const vue = Vue;

    vue.prototype.api = api;
  },
};

export default apiPlugin;
