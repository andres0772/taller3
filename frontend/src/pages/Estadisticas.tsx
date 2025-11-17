import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { peliculasApi } from '../api/peliculas';
import { favoritosApi } from '../api/favoritos';
import type { Pelicula } from '../types';
import { AnimatedPage } from '../components/AnimatedPage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { exportarJSON, exportarCSV } from '../utils/format';
import toast from 'react-hot-toast';

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6'];

export const Estadisticas: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [peliculasPorGenero, setPeliculasPorGenero] = useState<any[]>([]);
  const [peliculasPopulares, setPeliculasPopulares] = useState<Pelicula[]>([]);
  const [peliculasRecientes, setPeliculasRecientes] = useState<Pelicula[]>([]);
  const [distribucionClasificacion, setDistribucionClasificacion] = useState<any[]>([]);
  const [estadisticasGenerales, setEstadisticasGenerales] = useState<any>(null);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      
      const [peliculas, populares, recientes, estadisticasFav] = await Promise.all([
        peliculasApi.getAll(0, 1000),
        peliculasApi.getPopulares(10),
        peliculasApi.getRecientes(10),
        favoritosApi.getEstadisticas().catch(() => null)
      ]);

      // Películas por género
      const generos: Record<string, number> = {};
      peliculas.forEach(p => {
        const generosArray = p.genero.split(',').map(g => g.trim());
        generosArray.forEach(g => {
          generos[g] = (generos[g] || 0) + 1;
        });
      });
      
      const generoData = Object.entries(generos)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
      setPeliculasPorGenero(generoData);

      // Películas populares
      setPeliculasPopulares(populares);

      // Películas recientes
      setPeliculasRecientes(recientes);

      // Distribución por clasificación
      const clasificaciones: Record<string, number> = {};
      peliculas.forEach(p => {
        clasificaciones[p.clasificacion] = (clasificaciones[p.clasificacion] || 0) + 1;
      });
      
      const clasificacionData = Object.entries(clasificaciones)
        .map(([name, value]) => ({ name, value }));
      setDistribucionClasificacion(clasificacionData);

      setEstadisticasGenerales(estadisticasFav);

    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      toast.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const exportarDatos = (tipo: 'json' | 'csv') => {
    const data = {
      peliculas_por_genero: peliculasPorGenero,
      peliculas_populares: peliculasPopulares,
      peliculas_recientes: peliculasRecientes,
      distribucion_clasificacion: distribucionClasificacion
    };

    if (tipo === 'json') {
      exportarJSON(data, 'estadisticas-peliculas');
      toast.success('Datos exportados en JSON');
    } else {
      exportarCSV(peliculasPopulares, 'peliculas-populares');
      toast.success('Datos exportados en CSV');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatedPage>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Estadísticas y Reportes
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => exportarDatos('json')}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exportar JSON</span>
            </button>
            <button
              onClick={() => exportarDatos('csv')}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Estadísticas Generales */}
        {estadisticasGenerales && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Total de Favoritos
              </h3>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {estadisticasGenerales.total_favoritos}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Usuario Más Activo
              </h3>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {estadisticasGenerales.usuario_top?.nombre || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {estadisticasGenerales.usuario_top?.cantidad_favoritos || 0} favoritos
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Película Más Popular
              </h3>
              <p className="text-xl font-bold text-pink-600 dark:text-pink-400">
                {estadisticasGenerales.pelicula_top?.titulo || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {estadisticasGenerales.pelicula_top?.cantidad_favoritos || 0} favoritos
              </p>
            </div>
          </motion.div>
        )}

        {/* Gráfico de Películas por Género */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Películas por Género
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={peliculasPorGenero}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
              <XAxis 
                dataKey="name" 
                className="text-gray-600 dark:text-gray-400"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tw-bg-opacity, #fff)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar dataKey="value" name="Cantidad" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribución por Clasificación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Distribución por Clasificación
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionClasificacion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribucionClasificacion.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top 10 Películas Populares */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Top 10 Películas Más Populares
            </h2>
            <div className="space-y-3">
              {peliculasPopulares.map((pelicula, index) => (
                <div
                  key={pelicula.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-600 text-white rounded-full font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {pelicula.titulo}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pelicula.director} • {pelicula.año}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Películas Recientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Películas Recientes Agregadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {peliculasRecientes.map((pelicula) => (
              <div
                key={pelicula.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {pelicula.titulo}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pelicula.año}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pelicula.genero}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};
