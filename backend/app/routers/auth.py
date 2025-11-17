"""
Router de Autenticación.
Endpoints para login (crear tokens) y gestionar la sesión del usuario.
"""
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from app.auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    Token,
    authenticate_user,
    create_access_token,
    get_current_active_user,
)
from app.database import get_session
from app.models import Usuario
from app.schemas import UsuarioRead

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
):
    """
    Endpoint de login. Recibe un email (username) y una contraseña.
    Retorna un access_token si las credenciales son válidas.
    """
    # Aquí usamos el correo como 'username'
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.correo}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UsuarioRead)
async def read_users_me(
    current_user: Annotated[Usuario, Depends(get_current_active_user)]
):
    """
    Endpoint protegido que retorna la información del usuario actual
    autenticado a través del token.
    """
    return current_user