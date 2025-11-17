"""
Configuración de la aplicación.
Maneja diferentes entornos: desarrollo, pruebas y producción.
"""

from pydantic_settings import BaseSettings
from typing import Literal, ClassVar, Union
from pydantic import field_validator, ConfigDict

class Settings(BaseSettings):
    """
    Configuración de la aplicación usando Pydantic Settings.
    Lee las variables de entorno desde el archivo .env
    """
    
    # Configuración básica de la aplicación
    app_name: str = "API de Películas"
    app_version: str = "1.0.0"
    debug: bool = False
   
    environment: Literal["development", "testing", "production"] = "development"
    
    
    database_url: str = "sqlite:///./peliculas.db"
    
    # Configuración del servidor
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True # permite recargar automaticamente en desarrollo

    # Configuración de CORS
    # En desarrollo puedes usar ["*"], en producción especifica los orígenes permitidos
    allowed_origins: Union[str, list[str]] = "*"
    
    #  Configuración de seguridad (para futuras mejoras)
    secret_key: str  # Se leerá desde el archivo .env
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Configuración de logging
    log_level: str = "INFO"
    log_format: str = "%(asctime)s - %(levelname)s - %(message)s - %(message)s"
    log_date_format: str = "%Y-%m-%d %H:%M:%S"

    model_config: ClassVar[ConfigDict] = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

    @field_validator("database_url")
    def validate_database_url(cls, v):
        if not v:
            raise ValueError("DATABASE_URL no puede estar vacío")
        return v

    @field_validator("allowed_origins", mode="before")
    def assemble_cors_origins(cls, v: Union[str, list[str]]) -> list[str]:
        if isinstance(v, str) and not v.startswith("["):
            # Si es un string como "http://a.com,http://b.com", lo convierte en lista
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            # Si ya es una lista o un string con formato JSON de lista, pydantic lo manejará
            return v
        raise ValueError(v)


# Crear una instancia global de Settings
settings = Settings()
