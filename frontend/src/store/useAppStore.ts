import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario } from '../types';

interface AppState {
  // Usuario seleccionado actualmente
  selectedUser: Usuario | null;
  setSelectedUser: (user: Usuario | null) => void;

  // Tema oscuro/claro
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Películas favoritas del usuario seleccionado
  favoritePeliculaIds: number[];
  setFavoritePeliculaIds: (ids: number[]) => void;
  addFavoritePelicula: (id: number) => void;
  removeFavoritePelicula: (id: number) => void;

  // Estado de carga
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedUser: null,
      setSelectedUser: (user) => set({ selectedUser: user }),

      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      favoritePeliculaIds: [],
      setFavoritePeliculaIds: (ids) => set({ favoritePeliculaIds: ids }),
      addFavoritePelicula: (id) => set((state) => ({
        favoritePeliculaIds: [...state.favoritePeliculaIds, id]
      })),
      removeFavoritePelicula: (id) => set((state) => ({
        favoritePeliculaIds: state.favoritePeliculaIds.filter(fId => fId !== id)
      })),

      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        selectedUser: state.selectedUser,
        darkMode: state.darkMode,
      }),
    }
  )
);
