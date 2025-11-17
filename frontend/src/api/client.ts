import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error de respuesta del servidor
      console.error('Error de API:', error.response.data);
    } else if (error.request) {
      // No se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Error al configurar la solicitud
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
