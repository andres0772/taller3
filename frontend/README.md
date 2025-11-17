# Frontend - Sistema de Películas

Frontend moderno desarrollado con React, TypeScript, Vite y TailwindCSS que consume la API FastAPI del backend.

## Características

### Módulos Implementados

#### 1. **Dashboard (Página Principal)**
- Vista general con estadísticas
- Total de usuarios, películas y favoritos
- Película más popular
- Accesos rápidos a los módulos principales
- Diseño responsive y atractivo

#### 2. **Módulo de Usuarios**
- Listar todos los usuarios con tabla interactiva
- Crear nuevos usuarios con formulario de validación
- Editar información de usuarios existentes
- Eliminar usuarios con confirmación
- Búsqueda en tiempo real por nombre o correo
- Fecha de registro formateada

#### 3. **Módulo de Películas**
- Catálogo con diseño tipo tarjetas (cards)
- Formulario completo para agregar películas
- Validación de campos obligatorios
- Editar y eliminar con confirmación
- Búsqueda avanzada por: título, director, género
- Filtros por clasificación (G, PG, PG-13, R, NC-17)
- Vista detallada en modal

#### 4. **Módulo de Favoritos**
- Selector de usuario para cambiar vista
- Listar películas favoritas por usuario
- Marcar/desmarcar favoritos desde el catálogo
- Indicador visual de películas favoritas
- Contador de favoritos por usuario
- Eliminar favoritos con confirmación

#### 5. **Estadísticas y Reportes**
- Gráficos de películas por género (Bar Chart)
- Top 10 películas más populares
- Usuario más activo
- Películas recientes agregadas
- Distribución por clasificación (Pie Chart)
- Exportar datos a JSON y CSV

### Funcionalidades Adicionales

✅ **Modo oscuro/claro** - Toggle persistente en localStorage  
✅ **Animaciones suaves** - Transiciones con Framer Motion  
✅ **Notificaciones toast** - Feedback visual de acciones  
✅ **Persistencia de usuario** - Usuario seleccionado guardado en localStorage  
✅ **Exportación de datos** - JSON y CSV  
✅ **Diseño responsivo** - Optimizado para móvil, tablet y desktop  

## Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca UI
- **TypeScript 5.8.3** - Tipado estático
- **Vite 7.0.0** - Build tool ultra rápido
- **TailwindCSS 3.4.17** - Estilos utility-first
- **React Router DOM 6.30.1** - Navegación SPA
- **Zustand 4.4.7** - State management ligero
- **Axios 1.7.2** - Cliente HTTP
- **Framer Motion 11.0.8** - Animaciones fluidas
- **Recharts 2.12.7** - Gráficos y visualizaciones
- **React Hot Toast 2.4.1** - Notificaciones

## Instalación y Uso

### Prerrequisitos

- Node.js 24.11.1 (o superior)
- npm (incluido con Node.js)
- Backend FastAPI corriendo en `http://127.0.0.1:8000`

### Instalación

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

### Build de Producción

```bash
# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

## Configuración de la API

La URL base de la API está configurada en `src/api/client.ts`:

```typescript
const API_BASE_URL = 'http://127.0.0.1:8000';
```

Si tu API está en otra URL, modifica este valor.

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/              # Clientes API (usuarios, películas, favoritos)
│   ├── assets/           # Recursos estáticos
│   ├── components/       # Componentes reutilizables
│   │   ├── Layout.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ConfirmDialog.tsx
│   ├── pages/            # Páginas principales
│   │   ├── Dashboard.tsx
│   │   ├── Usuarios.tsx
│   │   ├── Peliculas.tsx
│   │   ├── Favoritos.tsx
│   │   └── Estadisticas.tsx
│   ├── store/            # Estado global (Zustand)
│   ├── types/            # Definiciones TypeScript
│   ├── utils/            # Utilidades y helpers
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Funcionalidades por Módulo

### Dashboard
- Resumen visual de estadísticas generales
- Tarjetas interactivas con enlaces a cada módulo
- Accesos rápidos a funcionalidades principales

### Usuarios
- Tabla completa con todos los usuarios
- Modal para crear/editar con validación
- Búsqueda en tiempo real
- Confirmación antes de eliminar

### Películas
- Grid de tarjetas visualmente atractivo
- Filtros múltiples (título, director, género, clasificación)
- Modal de detalle con información completa
- CRUD completo con validaciones

### Favoritos
- Selector de usuario persistente
- Vista de favoritos por usuario
- Marcar/desmarcar desde el catálogo general
- Indicadores visuales con iconos de corazón

### Estadísticas
- Gráficos interactivos con Recharts
- Exportación de datos
- Análisis visual de tendencias
- Top rankings

## Características UX/UI

### Diseño
- Interfaz minimalista y elegante
- Paleta de colores coherente
- Espaciado consistente
- Iconos de Lucide React

### Animaciones
- Transiciones suaves en navegación
- Efectos hover en elementos interactivos
- Animaciones de entrada/salida de modales
- Loading spinners animados

### Responsividad
- Grid adaptable a diferentes pantallas
- Navegación optimizada para móvil
- Tablas con scroll horizontal en móvil
- Espaciado responsivo

### Accesibilidad
- Labels semánticos en formularios
- Botones con texto descriptivo
- Contraste de colores adecuado
- Feedback visual de acciones

## Integración con Backend

Todos los endpoints de la API están integrados:

- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

- `GET /api/peliculas` - Listar películas
- `POST /api/peliculas` - Crear película
- `PUT /api/peliculas/:id` - Actualizar película
- `DELETE /api/peliculas/:id` - Eliminar película
- `GET /api/peliculas/buscar/` - Buscar películas
- `GET /api/peliculas/populares/top` - Películas populares
- `GET /api/peliculas/recientes/nuevas` - Películas recientes

- `GET /api/favoritos` - Listar favoritos
- `POST /api/favoritos` - Crear favorito
- `DELETE /api/favoritos/:id` - Eliminar favorito
- `GET /api/favoritos/usuario/:id` - Favoritos por usuario
- `GET /api/favoritos/verificar/:userId/:peliculaId` - Verificar favorito
- `GET /api/favoritos/estadisticas/generales` - Estadísticas generales

## Manejo de Errores

- Interceptores de Axios para errores globales
- Toast notifications para feedback al usuario
- Validación de formularios en cliente
- Manejo de estados de carga

## Estado Global

Usando Zustand para gestionar:
- Usuario seleccionado actual
- IDs de películas favoritas
- Tema oscuro/claro
- Estados de carga

Datos persistentes en localStorage:
- Usuario seleccionado
- Preferencia de tema

## Soporte de Navegadores

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## Licencia

Proyecto educativo - 2025
