# Sistema de Gestión de Películas

Este es un proyecto full-stack que implementa un sistema para administrar un catálogo de películas, usuarios y favoritos, incluyendo un dashboard con estadísticas.

## Información

-   **Nombre:** Andres Esteban Vasquez Peña
-   **Materia:** Lenguaje de Programacion 3
-   **Actividad:** Taller 3

## Descripción del Proyecto

El sistema es una aplicación web completa que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre películas y usuarios.

### Tecnologías Utilizadas

-   **Backend:** Desarrollado con **Python** y el framework **FastAPI**. Se encarga de toda la lógica de negocio, la API REST y la comunicación con la base de datos.
-   **Frontend:** Construido con **React** y **TypeScript**, utilizando **Vite** como herramienta de desarrollo rápido y **TailwindCSS** para un diseño moderno y responsivo.

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
    Crea un archivo llamado `.env` en la raíz del directorio `practica/` y copia el siguiente contenido. Puedes cambiar la clave secreta si lo deseas.

    ```env
    # Archivo: taller3/.env
    
    DATABASE_URL="sqlite:///./peliculas.db"
    
    SECRET_KEY="tu-clave-secreta-aqui"
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

¡Y listo! Con ambos servidores corriendo, la aplicación será completamente funcional.