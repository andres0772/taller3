"""
Punto de entrada principal de la aplicación FastAPI.
Este archivo inicializa la aplicación, configura middleware y registra los routers.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.config import settings
from app.database import create_db_and_tables, check_database_connection
from app.routers import auth, usuarios, peliculas, favoritos


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Contexto de vida de la aplicación.
    Se ejecuta al iniciar y al cerrar la aplicación.
    """
    # Startup: Crear tablas y verificar conexión
    print("🚀 Iniciando la aplicación...")
    create_db_and_tables()
    check_database_connection()
    print("✅ Base de datos lista")
    
    yield
    
    # Shutdown
    print("👋 Cerrando la aplicación...")


# Crear la aplicación FastAPI
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API REST para gestión de películas con autenticación JWT",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


# Configurar CORS (permite peticiones desde el frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Registrar routers
app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(peliculas.router)
app.include_router(favoritos.router)


# Ruta raíz - redirige a la documentación
@app.get("/", include_in_schema=False)
async def root():
    """Redirige a la documentación de la API."""
    return RedirectResponse(url="/docs")


# Endpoint de health check
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Verifica que la API esté funcionando correctamente.
    """
    return {
        "status": "healthy",
        "app_name": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
    }


# Endpoint de información de la API
@app.get("/info", tags=["Info"])
async def api_info():
    """
    Retorna información general sobre la API.
    """
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "docs_url": "/docs",
        "redoc_url": "/redoc",
        "endpoints": {
            "auth": "/api/auth",
            "usuarios": "/api/usuarios",
            "peliculas": "/api/peliculas",
            "favoritos": "/api/favoritos",
        }
    }


# Elimina o comenta las líneas que montan los archivos estáticos si no tienes un build de producción del frontend.
# Por ejemplo, las líneas que causan el error podrían ser algo como:
# from fastapi.staticfiles import StaticFiles
# app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
        log_level=settings.log_level.lower(),
    )
