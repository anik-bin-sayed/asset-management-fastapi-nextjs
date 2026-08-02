from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.user import User


class UserRepository:
    @staticmethod
    def get_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create(db: Session, user: User):
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def update_refresh_token(db, user, token):
        user.refresh_token = token

        db.commit()

        db.refresh(user)

    @staticmethod
    def get_by_id(db: Session, user_id: str):
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def logout(db: Session, user: User):
        user.refresh_token = None
        db.commit()
        db.refresh(user)

    @staticmethod
    def get_by_refresh_token(
        db: Session,
        refresh_token: str,
    ):
        return db.query(User).filter(User.refresh_token == refresh_token).first()

    @staticmethod
    def get_all_users(
        db,
        offset: int,
        limit: int,
        search: str | None = None,
    ):
        query = db.query(User).filter(User.role != "admin")

        if search:
            query = query.filter(
                or_(
                    User.name.ilike(f"%{search}%"),
                    User.username.ilike(f"%{search}%"),
                    User.email.ilike(f"%{search}%"),
                    User.id.ilike(f"%{search}%"),
                    User.phone.ilike(f"%{search}%"),
                )
            )

        total = query.count()

        users = query.order_by(User.created_at.desc()).offset(offset).limit(limit).all()

        return users, total
