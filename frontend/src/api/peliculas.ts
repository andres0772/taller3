import { apiClient } from './client';
import type { Pelicula, PeliculaCreate, PeliculaUpdate } from '../types';

export const peliculasApi = {
  getAll: async (skip = 0, limit = 100) => {
    const response = await apiClient.get<Pelicula[]>('/api/peliculas', {
      params: { skip, limit }
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Pelicula>(`/api/peliculas/${id}`);
    return response.data;
  },

  create: async (pelicula: PeliculaCreate) => {
    const response = await apiClient.post<Pelicula>('/api/peliculas', pelicula);
    return response.data;
  },

  update: async (id: number, pelicula: PeliculaUpdate) => {
    const response = await apiClient.put<Pelicula>(`/api/peliculas/${id}`, pelicula);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/api/peliculas/${id}`);
  },

  buscar: async (params: {
    titulo?: string;
    director?: string;
    genero?: string;
    año?: number;
    año_min?: number;
    año_max?: number;
  }) => {
    const response = await apiClient.get<Pelicula[]>('/api/peliculas/buscar/', {
      params
    });
    return response.data;
  },

  getPopulares: async (limit = 10) => {
    const response = await apiClient.get<Pelicula[]>('/api/peliculas/populares/top', {
      params: { limit }
    });
    return response.data;
  },

  getRecientes: async (limit = 10) => {
    const response = await apiClient.get<Pelicula[]>('/api/peliculas/recientes/nuevas', {
      params: { limit }
    });
    return response.data;
  },

  getPorClasificacion: async (clasificacion: string, limit = 100) => {
    const response = await apiClient.get<Pelicula[]>(`/api/peliculas/clasificacion/${clasificacion}`, {
      params: { limit }
    });
    return response.data;
  }
};
