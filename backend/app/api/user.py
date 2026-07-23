from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from fastapi import Response


from app.dependencies.database import get_db
from app.schemas.user import *
from app.models.user import User
from app.services.user_service import UserService
from app.utils.cookies import set_auth_cookies
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    data: UserCreate,
    db: Session = Depends(get_db),
):
    return UserService.register(
        db,
        data,
    )


@router.post("/login")
def login(
    data: UserLogin,
    response: Response,
    db: Session = Depends(get_db),
):
    access, refresh = UserService.login(
        db,
        data,
    )

    set_auth_cookies(
        response,
        access,
        refresh,
    )

    return {
        "message": "Login successful",
    }


@router.get(
    "/me",
    response_model=MeResponse,
)
def me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return UserService.me(
        db=db,
        user_id=current_user.id,
    )


@router.post("/logout")
def logout(
    response: Response,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    UserService.logout(
        db=db,
        user=current_user,
    )

    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
    )

    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        samesite="lax",
    )

    return {"message": "Logout successful"}


@router.post("/refresh")
def refresh(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token missing",
        )

    access_token = UserService.refresh(
        db,
        refresh_token,
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 15,
    )

    return {
        "message": "Access token refreshed",
    }
