import { apiClient } from './client';
import type { Favorito, FavoritoWithDetails, Pelicula } from '../types';

export const favoritosApi = {
  getAll: async (skip = 0, limit = 100) => {
    const response = await apiClient.get<Favorito[]>('/api/favoritos', {
      params: { skip, limit }
    });
    return response.data;
  },

  create: async (id_usuario: number, id_pelicula: number) => {
    const response = await apiClient.post<Favorito>('/api/favoritos', {
      id_usuario,
      id_pelicula
    });
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/api/favoritos/${id}`);
  },

  getPorUsuario: async (usuarioId: number) => {
    const response = await apiClient.get<FavoritoWithDetails[]>(`/api/favoritos/usuario/${usuarioId}`);
    return response.data;
  },

  getPeliculasFavoritasUsuario: async (usuarioId: number) => {
    const response = await apiClient.get<Pelicula[]>(`/api/usuarios/${usuarioId}/favoritos`);
    return response.data;
  },

  verificarFavorito: async (usuarioId: number, peliculaId: number) => {
    const response = await apiClient.get<{ es_favorito: boolean; favorito_id?: number }>
      (`/api/favoritos/verificar/${usuarioId}/${peliculaId}`);
    return response.data;
  },

  marcarFavorito: async (usuarioId: number, peliculaId: number) => {
    const response = await apiClient.post(`/api/usuarios/${usuarioId}/favoritos/${peliculaId}`);
    return response.data;
  },

  eliminarFavorito: async (usuarioId: number, peliculaId: number) => {
    await apiClient.delete(`/api/usuarios/${usuarioId}/favoritos/${peliculaId}`);
  },

  getEstadisticas: async () => {
    const response = await apiClient.get('/api/favoritos/estadisticas/generales');
    return response.data;
  },

  getRecomendaciones: async (usuarioId: number, limit = 5) => {
    const response = await apiClient.get<Pelicula[]>(`/api/favoritos/recomendaciones/${usuarioId}`, {
      params: { limit }
    });
    return response.data;
  }
};
