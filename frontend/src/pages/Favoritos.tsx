import React, { useEffect, useState } from 'react';
import { Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { usuariosApi } from '../api/usuarios';
import { peliculasApi } from '../api/peliculas';
import { favoritosApi } from '../api/favoritos';
import type { Usuario, Pelicula } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AnimatedPage } from '../components/AnimatedPage';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { formatearDuracion } from '../utils/format';
import { useAppStore } from '../store/useAppStore';
import toast from 'react-hot-toast';

export const Favoritos: React.FC = () => {
  const { selectedUser, setSelectedUser, favoritePeliculaIds, setFavoritePeliculaIds } = useAppStore();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [favoritosPeliculas, setFavoritosPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; pelicula: Pelicula | null }>({
    show: false,
    pelicula: null
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      cargarFavoritosUsuario();
    }
  }, [selectedUser]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [usuariosData, peliculasData] = await Promise.all([
        usuariosApi.getAll(),
        peliculasApi.getAll(0, 1000)
      ]);
      
      setUsuarios(usuariosData);
      setPeliculas(peliculasData);
      
      // Seleccionar primer usuario si no hay uno seleccionado
      if (!selectedUser && usuariosData.length > 0) {
        setSelectedUser(usuariosData[0]);
      }
    } catch (error) {
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const cargarFavoritosUsuario = async () => {
    if (!selectedUser) return;
    
    try {
      const peliculasFav = await favoritosApi.getPeliculasFavoritasUsuario(selectedUser.id);
      setFavoritosPeliculas(peliculasFav);
      setFavoritePeliculaIds(peliculasFav.map(p => p.id));
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      setFavoritosPeliculas([]);
      setFavoritePeliculaIds([]);
    }
  };

  const toggleFavorito = async (pelicula: Pelicula) => {
    if (!selectedUser) {
      toast.error('Selecciona un usuario primero');
      return;
    }

    try {
      const isFavorito = favoritePeliculaIds.includes(pelicula.id);
      
      if (isFavorito) {
        await favoritosApi.eliminarFavorito(selectedUser.id, pelicula.id);
        toast.success('Eliminado de favoritos');
      } else {
        await favoritosApi.marcarFavorito(selectedUser.id, pelicula.id);
        toast.success('Agregado a favoritos');
      }
      
      cargarFavoritosUsuario();
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Error al actualizar favorito';
      toast.error(errorMsg);
    }
  };

  const handleEliminarFavorito = async (pelicula: Pelicula) => {
    if (!selectedUser) return;
    
    try {
      await favoritosApi.eliminarFavorito(selectedUser.id, pelicula.id);
      toast.success('Eliminado de favoritos');
      cargarFavoritosUsuario();
    } catch (error) {
      toast.error('Error al eliminar favorito');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestión de Favoritos
        </h1>

        {/* Selector de Usuario */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center space-x-2 mb-3">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Usuario Seleccionado
            </label>
          </div>
          <select
            value={selectedUser?.id || ''}
            onChange={(e) => {
              const usuario = usuarios.find(u => u.id === parseInt(e.target.value));
              setSelectedUser(usuario || null);
            }}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {u.nombre} ({u.correo})
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <>
            {/* Estadísticas del Usuario */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Favoritos de {selectedUser.nombre}
              </h2>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Total de películas favoritas: 
                  <span className="font-bold text-gray-900 dark:text-white ml-2">
                    {favoritosPeliculas.length}
                  </span>
                </span>
              </div>
            </div>

            {/* Lista de Favoritos */}
            {favoritosPeliculas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritosPeliculas.map((pelicula) => (
                  <motion.div
                    key={pelicula.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="h-40 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center relative">
                      <Heart className="absolute top-3 right-3 h-6 w-6 text-white fill-white" />
                      <h3 className="text-xl font-bold text-white text-center px-4">
                        {pelicula.titulo}
                      </h3>
                    </div>
                    <div className="p-4 space-y-2">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Director</p>
                        <p className="font-medium text-gray-900 dark:text-white">{pelicula.director}</p>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{pelicula.genero}</span>
                        <span>{formatearDuracion(pelicula.duracion)}</span>
                      </div>

                      <button
                        onClick={() => setDeleteConfirm({ show: true, pelicula })}
                        className="w-full mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Eliminar de Favoritos</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Este usuario no tiene películas favoritas aún
                </p>
              </div>
            )}

            {/* Todas las Películas con Indicador de Favoritos */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Todas las Películas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {peliculas.map((pelicula) => {
                  const isFavorito = favoritePeliculaIds.includes(pelicula.id);
                  return (
                    <motion.div
                      key={pelicula.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {pelicula.titulo}
                        </h4>
                        <button
                          onClick={() => toggleFavorito(pelicula)}
                          className="flex-shrink-0"
                        >
                          <Heart
                            className={`h-5 w-5 transition-colors ${
                              isFavorito
                                ? 'text-pink-500 fill-pink-500'
                                : 'text-gray-400 hover:text-pink-500'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{pelicula.director}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{pelicula.año}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {!selectedUser && usuarios.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <User className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay usuarios registrados
            </p>
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, pelicula: null })}
        onConfirm={() => deleteConfirm.pelicula && handleEliminarFavorito(deleteConfirm.pelicula)}
        title="Eliminar de Favoritos"
        message={`¿Deseas eliminar "${deleteConfirm.pelicula?.titulo}" de los favoritos de ${selectedUser?.nombre}?`}
        confirmText="Eliminar"
      />
    </AnimatedPage>
  );
};
