"""
Módulo de Autenticación.
Contiene la lógica para la gestión de contraseñas, tokens JWT y
la obtención del usuario actual.
"""
from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlmodel import Session, select

from app.config import settings
from app.database import get_session
from app.models import Usuario

# --- Configuración ---

# Esquema de seguridad OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# Contexto para hashing de contraseñas
pwd_context = CryptContext(schemes=["argon2", "bcrypt"], deprecated="auto")

# Constantes del token
SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


# --- Funciones de Utilidad ---

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def authenticate_user(session: Session, email: str, password: str) -> Usuario | None:
    user = session.exec(select(Usuario).where(Usuario.correo == email)).first()
    if not user:
        return None
    # Ahora verificamos la contraseña real hasheada
    if not verify_password(password, user.hashed_password):
        return None
    return user


async def get_current_active_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
) -> Usuario:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        user = session.exec(select(Usuario).where(Usuario.correo == email)).first()
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception