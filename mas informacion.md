# Sistema de Gestión de Películas - Instrucciones de Uso

## Estructura del Proyecto

```
proyecto/
├── practica/                      # Backend FastAPI
│   ├── app/
│   │   ├── routers/
│   │   │   ├── auth.py           # Endpoints de autenticación
│   │   │   ├── usuarios.py       # Endpoints de usuarios
│   │   │   ├── peliculas.py      # Endpoints de películas
│   │   │   └── favoritos.py      # Endpoints de favoritos
│   │   ├── auth.py               # Lógica de autenticación JWT
│   │   ├── config.py             # Configuración del proyecto
│   │   ├── database.py           # Conexión a base de datos
│   │   ├── models.py             # Modelos SQLModel
│   │   ├── schemas.py            # Esquemas Pydantic
│   │   └── utils.py              # Utilidades
│   ├── .env                      # Variables de entorno
│   ├── main.py                   # Punto de entrada de la API
│   └── requirements.txt          # Dependencias Python
│
└── frontend/                      # Frontend React + TypeScript
    ├── src/
    │   ├── api/                  # Clientes API
    │   │   ├── client.ts         # Cliente Axios configurado
    │   │   ├── usuarios.ts       # API de usuarios
    │   │   ├── peliculas.ts      # API de películas
    │   │   └── favoritos.ts      # API de favoritos
    │   ├── components/           # Componentes reutilizables
    │   │   ├── Layout.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   └── ConfirmDialog.tsx
    │   ├── pages/                # Páginas principales
    │   │   ├── Dashboard.tsx     # Página de inicio
    │   │   ├── Usuarios.tsx      # Gestión de usuarios
    │   │   ├── Peliculas.tsx     # Catálogo de películas
    │   │   ├── Favoritos.tsx     # Gestión de favoritos
    │   │   └── Estadisticas.tsx  # Reportes y gráficos
    │   ├── store/                # Estado global (Zustand)
    │   ├── types/                # Tipos TypeScript
    │   ├── utils/                # Utilidades
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## Diagrama en Markgrok

```markgrok
proyecto/
  practica/
    app/
      routers/
        - auth.py
        - usuarios.py
        - peliculas.py
        - favoritos.py
      - auth.py
      - config.py
      - database.py
      - models.py
      - schemas.py
      - utils.py
    - .env
    - main.py
    - requirements.txt
  frontend/
    src/
      api/
        - client.ts
        - usuarios.ts
        - peliculas.ts
        - favoritos.ts
      components/
        - Layout.tsx
        - LoadingSpinner.tsx
        - ConfirmDialog.tsx
      pages/
        - Dashboard.tsx
        - Usuarios.tsx
        - Peliculas.tsx
        - Favoritos.tsx
        - Estadisticas.tsx
      store/
        - useAppStore.ts
      types/
        - index.ts
      utils/
        - format.ts
      - App.tsx
      - main.tsx
      - index.css
    - index.html
    - package.json
    - vite.config.ts
    - tailwind.config.js
    - tsconfig.json
```

## Cómo Hacer Funcionar el Sistema

### Requisitos Previos

- **WSL2 Ubuntu** (según tus especificaciones)
- **Python 3.8+** con pip
- **Node.js 24.11.1** (ya instalado según indicaste)
- **PostgreSQL** o **SQLite** (para la base de datos)

### Paso 1: Configurar el Backend (FastAPI)

1. **Navegar al directorio del backend:**
   ```bash
   cd practica
   ```

2. **Crear un entorno virtual de Python:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Instalar las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar las variables de entorno:**
   
   Edita el archivo `.env` con tus configuraciones:
   ```bash
   nano .env
   ```
   
   Asegúrate de tener algo similar a:
   ```env
   APP_NAME="Sistema de Películas"
   APP_VERSION="1.0.0"
   ENVIRONMENT="development"
   HOST="0.0.0.0"
   PORT=8000
   RELOAD=true
   LOG_LEVEL="INFO"
   
   # Database (SQLite por defecto)
   DATABASE_URL="sqlite:///./peliculas.db"
   
   # JWT
   SECRET_KEY="tu-clave-secreta-super-segura-cambiala-en-produccion"
   ALGORITHM="HS256"
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   
   # CORS
   ALLOWED_ORIGINS="http://localhost:5173,http://127.0.0.1:5173"
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   python main.py
   ```
   
   O usando uvicorn directamente:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Verificar que la API está corriendo:**
   
   Abre tu navegador y ve a:
   - **Documentación Swagger UI:** http://127.0.0.1:8000/docs
   - **Documentación ReDoc:** http://127.0.0.1:8000/redoc
   - **Health Check:** http://127.0.0.1:8000/health

### Paso 2: Configurar el Frontend (React + Vite)

1. **Abrir una nueva terminal y navegar al frontend:**
   ```bash
   cd frontend
   ```

2. **Las dependencias ya están instaladas**, pero si necesitas reinstalarlas:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación:**
   
   El frontend estará disponible en: **http://localhost:5173**

### Paso 3: Usar la Aplicación

1. **Abrir el navegador** en http://localhost:5173

2. **Navegar por los módulos:**
   - **Inicio:** Dashboard con estadísticas generales
   - **Usuarios:** Crear, editar, eliminar y buscar usuarios
   - **Películas:** Gestionar el catálogo completo
   - **Favoritos:** Marcar películas favoritas por usuario
   - **Estadísticas:** Ver gráficos y reportes

3. **Funcionalidades clave:**
   - **Modo Oscuro/Claro:** Botón en el header (sol/luna)
   - **Búsqueda:** Campos de búsqueda en cada módulo
   - **Exportar Datos:** Botones en Estadísticas para JSON/CSV
   - **Persistencia:** Usuario seleccionado se guarda automáticamente

## Flujo de Trabajo Recomendado

### Primera vez usando el sistema:

1. **Crear algunos usuarios** en el módulo de Usuarios
2. **Agregar películas** en el módulo de Películas
3. **Seleccionar un usuario** en Favoritos
4. **Marcar películas como favoritas**
5. **Ver las estadísticas** generadas

### Datos de Prueba

Puedes usar estos datos de ejemplo:

**Usuarios:**
- Nombre: Juan Pérez, Correo: juan@email.com, Password: password123
- Nombre: María García, Correo: maria@email.com, Password: password123

**Películas:**
- Título: Inception, Director: Christopher Nolan, Género: Ciencia Ficción, Duración: 148 min, Año: 2010, Clasificación: PG-13
- Título: The Shawshank Redemption, Director: Frank Darabont, Género: Drama, Duración: 142 min, Año: 1994, Clasificación: R

## Solución de Problemas Comunes

### Backend no se conecta:
```bash
# Verificar que el puerto 8000 no esté ocupado
lsof -i :8000

# Revisar logs de errores
tail -f nohup.out
```

### Frontend no se conecta al backend:
- Verifica que la API esté corriendo en http://127.0.0.1:8000
- Revisa `frontend/src/api/client.ts` y asegúrate que la URL sea correcta
- Verifica CORS en `practica/app/config.py`

### Error de CORS:
Asegúrate de que el frontend origin esté en `ALLOWED_ORIGINS` del archivo `.env`

### Base de datos no se crea:
```bash
# Eliminar la base de datos existente y dejar que se recree
cd taller3
rm peliculas.db
python main.py
```

## Comandos Útiles

### Backend:
```bash
# Activar entorno virtual
source venv/bin/activate

# Iniciar servidor
python main.py

# Ver logs en tiempo real
tail -f nohup.out

# Desactivar entorno virtual
deactivate
```

### Frontend:
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Build de Producción

### Backend:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend:
```bash
cd frontend
npm run build
# Los archivos estarán en frontend/dist/
```

## Notas Importantes

1. **El backend DEBE estar corriendo** antes de iniciar el frontend
2. **La URL de la API** está configurada en `frontend/src/api/client.ts` como `http://127.0.0.1:8000`
3. **Todos los datos son reales** y se consumen de los endpoints de FastAPI
4. **Las animaciones y el modo oscuro** funcionan automáticamente
5. **Los datos se persisten** en la base de datos SQLite (`peliculas.db`)

## Características Implementadas

✅ Todos los módulos de Usuario con CRUD completo  
✅ Catálogo de Películas con búsqueda y filtros avanzados  
✅ Sistema de Favoritos por usuario  
✅ Dashboard con estadísticas en tiempo real  
✅ Gráficos interactivos con Recharts  
✅ Modo oscuro/claro persistente  
✅ Exportación a JSON y CSV  
✅ Animaciones suaves con Framer Motion  
✅ Notificaciones toast  
✅ Diseño 100% responsivo  
✅ Validación de formularios  
✅ Confirmación de eliminación  
