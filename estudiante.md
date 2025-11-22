# Sistema de Gestión de Películas

Este es un proyecto full-stack que implementa un sistema completo para administrar un catálogo de películas, usuarios y favoritos, incluyendo un dashboard interactivo con estadísticas en tiempo real.

## Información del Estudiante

-   **Nombre:** Andres Esteban Vasquez Peña
-   **Materia:** Lenguajes de Programación 3
-   **Proyecto:** Taller 2 + Taller 3

## Descripción del Proyecto

### Taller 2 - Backend (FastAPI)
Se desarrolló la API REST completa utilizando **FastAPI** con los siguientes endpoints:
- **Gestión de Películas**: Crear, leer, actualizar y eliminar películas del catálogo
- **Gestión de Usuarios**: Registro y administración de usuarios con autenticación JWT
- **Sistema de Favoritos**: Permite a los usuarios marcar películas como favoritas
- **Estadísticas**: Endpoints para generar reportes y datos analíticos
- **Base de Datos**: SQLite con SQLAlchemy ORM para persistencia de datos

### Taller 3 - Frontend (React)
Se construyó la interfaz de usuario completa que consume los endpoints del backend:
- **Dashboard Principal**: Vista con estadísticas generales y gráficos interactivos
- **Módulo de Usuarios**: CRUD completo para gestión de usuarios
- **Catálogo de Películas**: Visualización, búsqueda, edición y eliminación de películas
- **Sistema de Favoritos**: Interface para marcar y gestionar películas favoritas por usuario
- **Estadísticas Avanzadas**: Gráficos con Recharts y exportación de datos (JSON/CSV)

### Tecnologías Utilizadas

#### Backend:
- **Python 3.8+**: Lenguaje principal
- **FastAPI**: Framework moderno para APIs
- **SQLAlchemy**: ORM para base de datos
- **SQLite**: Base de datos ligera
- **Pydantic**: Validación de datos
- **JWT**: Autenticación de usuarios
- **Uvicorn**: Servidor ASGI

#### Frontend:
- **React 18**: Librería principal de UI
- **TypeScript**: Tipado estático
- **Vite**: Herramienta de desarrollo rápido
- **TailwindCSS**: Framework de CSS para diseño moderno
- **Zustand**: Manejo de estado global
- **Recharts**: Librería para gráficos interactivos
- **Framer Motion**: Animaciones suaves
- **Axios**: Cliente HTTP para API calls
- **Lucide React**: Iconos modernos

## Cómo Probar el Proyecto

Para ejecutar el sistema, necesitas tener ambos, el backend y el frontend, corriendo al mismo tiempo.

### 1. Configuración del Backend (FastAPI)

El backend requiere un entorno virtual de Python para gestionar sus dependencias de forma aislada.

1.  **Navega al directorio del backend:**
    ```bash
    cd backend
    ```

2.  **Crea y activa el entorno virtual:**
    ```bash
    # Crear el entorno
    python3 -m venv venv
    
    # Activar en Linux/macOS
    source venv/bin/activate
    
    # (Alternativa) Activar en Windows
    # venv\Scripts\activate
    ```

3.  **Instala las dependencias:**
    Todas las dependencias necesarias están en `requirements.txt`.
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env` en el directorio `backend/` copiando del `.env_example`:

    ```bash
    cp .env_example .env
    ```
    
    El archivo `.env` contiene:
    ```env
    APP_NAME="Sistema de Películas"
    APP_VERSION="1.0.0"
    ENVIRONMENT="development"
    HOST="0.0.0.0"
    PORT=8000
    RELOAD=true
    LOG_LEVEL="INFO"
    
    DATABASE_URL="sqlite:///./peliculas.db"
    
    SECRET_KEY="admin123"
    ALGORITHM="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    
    ALLOWED_ORIGINS="http://localhost:5173,http://127.0.0.1:5173"
    ```

5.  **Inicia el servidor del backend:**
    ```bash
    uvicorn main:app --reload
    ```
    La API estará disponible en `http://127.0.0.1:8000`. Puedes ver la documentación interactiva en `http://127.0.0.1:8000/docs`.

### 2. Configuración del Frontend (React)

Abre una **nueva terminal** para correr el frontend.

1.  **Navega al directorio del frontend:**
    ```bash
    cd frontend
    ```

2.  **Instala las dependencias:**
    Todas las dependencias de Node.js están listadas en `package.json`.
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Accede a la aplicación:**
    Abre tu navegador y visita **http://localhost:5173**.

## Flujo de Trabajo para Pruebas

1. **Crear Usuarios**: Ingresa al módulo Usuarios y registra algunos usuarios de prueba
2. **Agregar Películas**: En el módulo Películas, agrega películas al catálogo
3. **Marcar Favoritos**: Selecciona un usuario y marca películas como favoritas
4. **Ver Estadísticas**: Revisa el dashboard y los reportes generados automáticamente

## Características Implementadas

✅ CRUD completo para Usuarios y Películas  
✅ Sistema de autenticación con JWT  
✅ Gestión de favoritos por usuario  
✅ Dashboard con estadísticas en tiempo real  
✅ Gráficos interactivos con Recharts  
✅ Modo oscuro/claro persistente  
✅ Exportación de datos a JSON y CSV  
✅ Animaciones suaves con Framer Motion  
✅ Diseño 100% responsivo  
✅ Validación de formularios  
✅ Confirmación de eliminación  
✅ Búsqueda y filtros avanzados  

¡Y listo! Con ambos servidores corriendo, la aplicación será completamente funcional. Puedes acceder a la documentación de la API en http://127.0.0.1:8000/docs