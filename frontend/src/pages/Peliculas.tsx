import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Eye, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { peliculasApi } from '../api/peliculas';
import type { Pelicula, PeliculaCreate } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { AnimatedPage } from '../components/AnimatedPage';
import { formatearDuracion, formatearFechaCorta } from '../utils/format';
import toast from 'react-hot-toast';

const CLASIFICACIONES = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

export const Peliculas: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    titulo: '',
    director: '',
    genero: '',
    clasificacion: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPelicula, setSelectedPelicula] = useState<Pelicula | null>(null);
  const [editingPelicula, setEditingPelicula] = useState<Pelicula | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; pelicula: Pelicula | null }>({
    show: false,
    pelicula: null
  });

  const [formData, setFormData] = useState<PeliculaCreate>({
    titulo: '',
    director: '',
    genero: '',
    duracion: 0,
    año: new Date().getFullYear(),
    clasificacion: 'PG',
    sinopsis: ''
  });

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const cargarPeliculas = async () => {
    try {
      setLoading(true);
      const data = await peliculasApi.getAll(0, 1000);
      setPeliculas(data);
    } catch (error) {
      toast.error('Error al cargar películas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPelicula) {
        await peliculasApi.update(editingPelicula.id, formData);
        toast.success('Película actualizada correctamente');
      } else {
        await peliculasApi.create(formData);
        toast.success('Película creada correctamente');
      }
      
      setShowModal(false);
      resetForm();
      cargarPeliculas();
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || 'Error al guardar película';
      toast.error(errorMsg);
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      director: '',
      genero: '',
      duracion: 0,
      año: new Date().getFullYear(),
      clasificacion: 'PG',
      sinopsis: ''
    });
    setEditingPelicula(null);
  };

  const handleEdit = (pelicula: Pelicula) => {
    setEditingPelicula(pelicula);
    setFormData({
      titulo: pelicula.titulo,
      director: pelicula.director,
      genero: pelicula.genero,
      duracion: pelicula.duracion,
      año: pelicula.año,
      clasificacion: pelicula.clasificacion,
      sinopsis: pelicula.sinopsis || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (pelicula: Pelicula) => {
    try {
      await peliculasApi.delete(pelicula.id);
      toast.success('Película eliminada correctamente');
      cargarPeliculas();
    } catch (error) {
      toast.error('Error al eliminar película');
    }
  };

  const peliculasFiltradas = peliculas.filter(p => {
    const matchTitulo = !searchParams.titulo || p.titulo.toLowerCase().includes(searchParams.titulo.toLowerCase());
    const matchDirector = !searchParams.director || p.director.toLowerCase().includes(searchParams.director.toLowerCase());
    const matchGenero = !searchParams.genero || p.genero.toLowerCase().includes(searchParams.genero.toLowerCase());
    const matchClasificacion = !searchParams.clasificacion || p.clasificacion === searchParams.clasificacion;
    return matchTitulo && matchDirector && matchGenero && matchClasificacion;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Catálogo de Películas
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nueva Película</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchParams.titulo}
              onChange={(e) => setSearchParams({ ...searchParams, titulo: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Buscar por director..."
              value={searchParams.director}
              onChange={(e) => setSearchParams({ ...searchParams, director: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Buscar por género..."
              value={searchParams.genero}
              onChange={(e) => setSearchParams({ ...searchParams, genero: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              value={searchParams.clasificacion}
              onChange={(e) => setSearchParams({ ...searchParams, clasificacion: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Todas las clasificaciones</option>
              {CLASIFICACIONES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Películas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peliculasFiltradas.map((pelicula) => (
            <motion.div
              key={pelicula.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white text-center px-4">
                  {pelicula.titulo}
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Director</p>
                    <p className="font-medium text-gray-900 dark:text-white">{pelicula.director}</p>
                  </div>
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs font-semibold">
                    {pelicula.clasificacion}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{pelicula.genero}</span>
                  <span>{formatearDuracion(pelicula.duracion)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Año: {pelicula.año}</span>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={() => {
                      setSelectedPelicula(pelicula);
                      setShowDetailModal(true);
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Ver</span>
                  </button>
                  <button
                    onClick={() => handleEdit(pelicula)}
                    className="p-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ show: true, pelicula })}
                    className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {peliculasFiltradas.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            No se encontraron películas
          </div>
        )}
      </div>

      {/* Modal de Formulario */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editingPelicula ? 'Editar Película' : 'Nueva Película'}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Título *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Director *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.director}
                        onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Género *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.genero}
                        onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Duración (minutos) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.duracion}
                        onChange={(e) => setFormData({ ...formData, duracion: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Año *
                      </label>
                      <input
                        type="number"
                        required
                        min="1888"
                        max="2100"
                        value={formData.año}
                        onChange={(e) => setFormData({ ...formData, año: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Clasificación *
                      </label>
                      <select
                        required
                        value={formData.clasificacion}
                        onChange={(e) => setFormData({ ...formData, clasificacion: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {CLASIFICACIONES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sinopsis
                    </label>
                    <textarea
                      value={formData.sinopsis}
                      onChange={(e) => setFormData({ ...formData, sinopsis: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex space-x-3 justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                    >
                      {editingPelicula ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Detalle */}
      <AnimatePresence>
        {showDetailModal && selectedPelicula && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetailModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedPelicula.titulo}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Dirigida por {selectedPelicula.director}
                    </p>
                  </div>
                  <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Género</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedPelicula.genero}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Clasificación</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedPelicula.clasificacion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duración</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatearDuracion(selectedPelicula.duracion)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Año</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedPelicula.año}</p>
                    </div>
                  </div>

                  {selectedPelicula.sinopsis && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Sinopsis</p>
                      <p className="text-gray-900 dark:text-white">{selectedPelicula.sinopsis}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Agregada el</p>
                    <p className="text-gray-900 dark:text-white">
                      {formatearFechaCorta(selectedPelicula.fecha_creacion)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, pelicula: null })}
        onConfirm={() => deleteConfirm.pelicula && handleDelete(deleteConfirm.pelicula)}
        title="Eliminar Película"
        message={`¿Estás seguro de que deseas eliminar "${deleteConfirm.pelicula?.titulo}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
      />
    </AnimatedPage>
  );
};
