// Tipos de datos para la API

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fecha_registro: string;
}

export interface UsuarioCreate {
  nombre: string;
  correo: string;
  password: string;
}

export interface UsuarioUpdate {
  nombre?: string;
  correo?: string;
}

export interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  genero: string;
  duracion: number;
  año: number;
  clasificacion: string;
  sinopsis: string | null;
  fecha_creacion: string;
}

export interface PeliculaCreate {
  titulo: string;
  director: string;
  genero: string;
  duracion: number;
  año: number;
  clasificacion: string;
  sinopsis?: string;
}

export interface PeliculaUpdate {
  titulo?: string;
  director?: string;
  genero?: string;
  duracion?: number;
  año?: number;
  clasificacion?: string;
  sinopsis?: string;
}

export interface Favorito {
  id: number;
  id_usuario: number;
  id_pelicula: number;
  fecha_marcado: string;
}

export interface FavoritoWithDetails extends Favorito {
  usuario: Usuario;
  pelicula: Pelicula;
}

export interface EstadisticasGenerales {
  total_usuarios: number;
  total_peliculas: number;
  total_favoritos: number;
  pelicula_mas_popular: string | null;
}

export interface EstadisticasUsuario {
  usuario_id: number;
  total_peliculas_favoritas: number;
  generos_preferidos: Array<{ genero: string; cantidad: number }>;
  tiempo_total_minutos: number;
  tiempo_total_formateado: string;
}
