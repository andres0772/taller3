import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Film, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { usuariosApi } from '../api/usuarios';
import { peliculasApi } from '../api/peliculas';
import { favoritosApi } from '../api/favoritos';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AnimatedPage } from '../components/AnimatedPage';
import toast from 'react-hot-toast';

interface Stats {
  totalUsuarios: number;
  totalPeliculas: number;
  totalFavoritos: number;
  peliculaMasPopular: string;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const [usuarios, peliculas, estadisticasFav] = await Promise.all([
        usuariosApi.getAll(0, 1000),
        peliculasApi.getAll(0, 1000),
        favoritosApi.getEstadisticas().catch(() => ({ 
          total_favoritos: 0, 
          pelicula_top: { titulo: 'N/A' } 
        }))
      ]);

      setStats({
        totalUsuarios: usuarios.length,
        totalPeliculas: peliculas.length,
        totalFavoritos: estadisticasFav.total_favoritos || 0,
        peliculaMasPopular: estadisticasFav.pelicula_top?.titulo || 'N/A'
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      toast.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const statCards = [
    {
      title: 'Usuarios Registrados',
      value: stats?.totalUsuarios || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/usuarios'
    },
    {
      title: 'Películas en Catálogo',
      value: stats?.totalPeliculas || 0,
      icon: Film,
      color: 'bg-purple-500',
      link: '/peliculas'
    },
    {
      title: 'Favoritos Marcados',
      value: stats?.totalFavoritos || 0,
      icon: Heart,
      color: 'bg-pink-500',
      link: '/favoritos'
    },
    {
      title: 'Película Más Popular',
      value: stats?.peliculaMasPopular || 'N/A',
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/estadisticas'
    }
  ];

  return (
    <AnimatedPage>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Bienvenido al Sistema de Películas
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Gestiona usuarios, películas y favoritos de manera fácil y eficiente
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/usuarios"
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Gestionar Usuarios</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Crear, editar y eliminar usuarios
              </p>
            </Link>
            <Link
              to="/peliculas"
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
              <Film className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Catálogo de Películas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Explorar y gestionar películas
              </p>
            </Link>
            <Link
              to="/estadisticas"
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Ver Estadísticas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Análisis y reportes detallados
              </p>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
