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

    @staticmethod
    def update(db, category_id: int, data):

        category = CategoryRepository.get_by_id(db, category_id)

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found",
            )

        if data.name is not None:
            slug = generate_slug(data.name)

            exists = CategoryRepository.get_by_slug(db, slug)

            if exists and exists.id != category.id:
                raise HTTPException(
                    status_code=400,
                    detail="Category already exists",
                )

            category.name = data.name
            category.slug = slug

        if data.description is not None:
            category.description = data.description

        return CategoryRepository.update(db, category)

    @staticmethod
    def delete(db, category_id: int):

        category = CategoryRepository.get_by_id(
            db,
            category_id,
        )

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found",
            )

        CategoryRepository.delete(
            db,
            category,
        )

        return {"message": "Category deleted successfully."}
