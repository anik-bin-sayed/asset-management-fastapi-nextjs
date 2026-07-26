from fastapi import HTTPException

from app.models.course import (
    Course,
    CourseStatus,
)
from app.repositories.category_repository import CategoryRepository
from app.repositories.course_repository import CourseRepository
from app.utils.slug import generate_slug


class CourseService:

    @staticmethod
    def create(
        db,
        data,
        current_user,
    ):

        category = CategoryRepository.get_by_id(
            db,
            data.category_id,
        )

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found",
            )

        if data.discount_price is not None and data.discount_price > data.price:
            raise HTTPException(
                status_code=400,
                detail="Discount price cannot be greater than price.",
            )

        slug = generate_slug(data.title)

        exists = CourseRepository.get_by_slug(
            db,
            slug,
        )

        if exists:
            raise HTTPException(
                status_code=400,
                detail="Course already exists.",
            )

        course = Course(
            title=data.title,
            slug=slug,
            short_description=data.short_description,
            description=data.description,
            price=data.price,
            discount_price=data.discount_price,
            level=data.level,
            language=data.language,
            status=CourseStatus.DRAFT,
            category_id=data.category_id,
            instructor_id=current_user.id,
        )

        return CourseRepository.create(
            db,
            course,
        )

    @staticmethod
    def get_all(
        db,
        search=None,
        category_id=None,
        status=None,
        level=None,
        language=None,
        page=1,
        limit=10,
    ):

        skip = (page - 1) * limit

        courses, total = CourseRepository.get_all(
            db=db,
            search=search,
            category_id=category_id,
            status=status,
            level=level,
            language=language,
            skip=skip,
            limit=limit,
        )

        return {
            "data": courses,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
        }
