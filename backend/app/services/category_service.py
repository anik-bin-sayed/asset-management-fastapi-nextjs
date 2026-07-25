from fastapi import HTTPException

from app.models.category import Category
from app.repositories.category_repository import CategoryRepository
from app.utils.slug import generate_slug


class CategoryService:

    @staticmethod
    def create(db, data):

        exists = CategoryRepository.get_by_name(
            db,
            data.name,
        )

        if exists:
            raise HTTPException(
                status_code=400,
                detail="Category already exists",
            )

        category = Category(
            name=data.name,
            slug=generate_slug(data.name),
            description=data.description,
        )

        return CategoryRepository.create(
            db,
            category,
        )

    @staticmethod
    def get_all(db):
        return CategoryRepository.get_all(db)
