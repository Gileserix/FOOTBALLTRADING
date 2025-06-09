import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Recupera el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Añade el token al encabezado
  }
  return config;
});

export default api;