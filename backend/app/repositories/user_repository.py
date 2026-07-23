from sqlalchemy.orm import Session

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
