from sqlalchemy.orm import Session

from app.models.category import Category


class CategoryRepository:

    @staticmethod
    def get_by_name(db: Session, name: str):
        return db.query(Category).filter(Category.name == name).first()

    @staticmethod
    def create(db: Session, category: Category):
        db.add(category)
        db.commit()
        db.refresh(category)

        return category

    @staticmethod
    def get_all(db: Session):
        return db.query(Category).all()
