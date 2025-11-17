import { apiClient } from './client';
import type { Usuario, UsuarioCreate, UsuarioUpdate } from '../types';

export const usuariosApi = {
  getAll: async (skip = 0, limit = 100) => {
    const response = await apiClient.get<Usuario[]>('/api/usuarios', {
      params: { skip, limit }
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Usuario>(`/api/usuarios/${id}`);
    return response.data;
  },

  create: async (usuario: UsuarioCreate) => {
    const response = await apiClient.post<Usuario>('/api/usuarios', usuario);
    return response.data;
  },

  update: async (id: number, usuario: UsuarioUpdate) => {
    const response = await apiClient.put<Usuario>(`/api/usuarios/${id}`, usuario);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/api/usuarios/${id}`);
  },

  buscar: async (query: string) => {
    const usuarios = await usuariosApi.getAll(0, 1000);
    return usuarios.filter(u => 
      u.nombre.toLowerCase().includes(query.toLowerCase()) ||
      u.correo.toLowerCase().includes(query.toLowerCase())
    );
  }
};
