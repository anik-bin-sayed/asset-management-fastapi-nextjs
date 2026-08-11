from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_access_token, create_refresh_token, decode_token


class UserService:

    @staticmethod
    def register(db, data):

        existing = UserRepository.get_by_email(
            db,
            data.email,
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already exists",
            )

        user = User(
            name=data.name,
            email=data.email,
            password=hash_password(data.password),
        )

        return UserRepository.create(
            db,
            user,
        )

    # Login
    @staticmethod
    def login(db, data):
        user = UserRepository.get_by_email(
            db,
            data.email,
        )

        if not user:
            raise HTTPException(
                status_code=400,
                detail="User not found. Please login first!!",
            )

        if not verify_password(
            data.password,
            user.password,
        ):
            raise HTTPException(
                401,
                "Invalid email or password",
            )

        access = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role,
            }
        )

        refresh = create_refresh_token(
            {
                "sub": str(user.id),
            }
        )

        UserRepository.update_refresh_token(
            db,
            user,
            refresh,
        )

        return access, refresh

    @staticmethod
    def me(db, user_id: str):
        user = UserRepository.get_by_id(db, user_id)
        print("user", user)

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        return user

    @staticmethod
    def logout(
        db: Session,
        user: User,
    ):
        UserRepository.logout(
            db=db,
            user=user,
        )

    @staticmethod
    def refresh(
        db: Session,
        refresh_token: str,
    ):
        payload = decode_token(refresh_token)

        if not payload:
            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token",
            )

        if payload["type"] != "refresh":
            raise HTTPException(
                status_code=401,
                detail="Invalid token type",
            )

        user = UserRepository.get_by_refresh_token(
            db,
            refresh_token,
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Refresh token expired",
            )

        access_token = create_access_token(
            {"sub": str(user.id), "type": "access", "role": user.role}
        )

        return access_token
