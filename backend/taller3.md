# API de Películas - Frontend

Proyecto **lp3-taller3**: Desarrollo de un sitio web interactivo para gestionar películas, usuarios y favoritos, consumiendo la API RESTful del proyecto **lp3-taller2**.

## Descripción

Este proyecto consiste en desarrollar una interfaz web completa que permita a los usuarios interactuar con la API de Películas. Los estudiantes construirán un frontend moderno y responsivo que facilite:

- **Gestión de usuarios**: registro, visualización y edición de perfiles.
- **Exploración de películas**: búsqueda avanzada, filtrado por género, director, año y clasificación.
- **Sistema de favoritos**: marcar/desmarcar películas favoritas y visualizar colecciones personalizadas.
- **Estadísticas**: visualización de datos sobre películas populares y preferencias de usuarios.

## Objetivos de Aprendizaje

Al completar este taller, los estudiantes serán capaces de:

1. Consumir una API RESTful
2. Implementar operaciones CRUD (Create, Read, Update, Delete) desde el frontend
3. Manejar estados de la aplicación y respuestas asíncronas
4. Validar formularios y datos de entrada
5. Gestionar errores y proporcionar retroalimentación al usuario
6. Crear interfaces responsivas y accesibles
7. Implementar paginación y búsqueda en tiempo real

## Requisitos Previos

- Tener completado y funcionando el proyecto **lp3-taller2** (API de Películas)
- Conocimientos básicos de HTML, CSS y JavaScript
- Familiaridad con conceptos de APIs REST
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

## Configuración Inicial

1. **Fork** del repositorio.

2. **Clonar** el repositorio:

   ```bash
   git clone https://github.com/TU_USUARIO/lp3-taller3.git
   ```

3. Asegúrate de que el proyecto **lp3-taller2** esté ejecutándos, verifica que la API responda en: `http://127.0.0.1:8000/docs`


## Funcionalidades Requeridas

### 1. Módulo de Usuarios

- [ ] Listar todos los usuarios con paginación
- [ ] Formulario para crear nuevos usuarios
- [ ] Validación de campos (nombre, correo único)
- [ ] Editar información de usuarios existentes
- [ ] Eliminar usuarios con confirmación
- [ ] Búsqueda de usuarios por nombre o correo
- [ ] Mostrar fecha de registro formateada

    **Criterios de evaluación:**
    
    - Validación de correo electrónico con expresiones regulares
    - Manejo de errores (usuario no encontrado, correo duplicado)
    - Feedback visual al usuario (mensajes de éxito/error)
    - Confirmación antes de eliminar

### 2. Módulo de Películas

- [ ] Catálogo de películas con diseño tipo tarjetas (*cards*)
- [ ] Paginación con controles de navegación
- [ ] Formulario para agregar nuevas películas
- [ ] Validación de campos obligatorios
- [ ] Editar películas existentes
- [ ] Eliminar películas con confirmación
- [ ] Búsqueda avanzada por: Título, Director, Género, Año
- [ ] Filtros por clasificación (G, PG, PG-13, R)
- [ ] Vista detallada de cada película (modal o página separada)

    **Criterios de evaluación:**
    
    - Diseño visual atractivo de las tarjetas de películas
    - Implementación correcta de paginación
    - Búsqueda funcional con actualización en tiempo real
    - Validación de año (rango válido) y duración (número positivo)

### 3. Módulo de Favoritos

- [ ] Listar películas favoritas por usuario
- [ ] Selector de usuario para cambiar la vista
- [ ] Botón para marcar/desmarcar favoritos desde el catálogo
- [ ] Indicador visual de películas ya marcadas como favoritas
- [ ] Eliminar favoritos con confirmación
- [ ] Contador de favoritos por usuario
- [ ] Vista de todas las películas con indicador de favoritos

    **Criterios de evaluación:**
    
    - Sincronización correcta entre módulos (marcar favorito actualiza vistas)
    - Prevención de duplicados
    - Feedback inmediato al marcar/desmarcar
    - Manejo de casos donde usuario o película no existen

### 4. Página Principal

- [ ] Página de bienvenida con descripción del sitio
- [ ] Navegación clara hacia las diferentes secciones
- [ ] Estadísticas generales:
   - Total de usuarios registrados
   - Total de películas en el catálogo
   - Total de favoritos marcados
   - Película más popular
- [ ] Diseño responsivo y atractivo

### 5. Estadísticas y Reportes

- [ ] Gráficos de películas por género
- [ ] Top 10 películas más populares
- [ ] Usuarios más activos (más favoritos)
- [ ] Películas recientes (últimas agregadas)
- [ ] Distribución por clasificación

### 6. Funcionalidades Opcionales

- [ ] Sistema de recomendaciones basado en favoritos
- [ ] Modo oscuro/claro
- [ ] Exportar listados a CSV o JSON
- [ ] Ordenamiento de resultados (alfabético, por año, por popularidad)
- [ ] Búsqueda con sugerencias automáticas (*autocomplete*)
- [ ] Animaciones y transiciones suaves
- [ ] Persistencia del usuario seleccionado en `localStorage`
<<<<<<< HEAD
- [ ] Notificaciones tipo *toast* para acciones


=======
- [ ] Notificaciones tipo *toast* para acciones
>>>>>>> 335cf4f (mejoras del frontend)
