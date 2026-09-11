import math

from sqlalchemy.orm import Session

from app.repositories.upcoming_course import CourseRepository


class CourseService:

    @staticmethod
    def get_upcoming_courses(
        db: Session,
        page: int = 1,
        page_size: int = 8,
    ):
        skip = (page - 1) * page_size

        courses = CourseRepository.get_upcoming_courses(
            db=db,
            skip=skip,
            limit=page_size,
        )

        total = CourseRepository.count_upcoming_courses(db)

        total_pages = math.ceil(total / page_size) if total > 0 else 0

        grouped_categories = {}

        for course in courses:
            category = course.category

            if not category:
                continue

            if category.id not in grouped_categories:
                grouped_categories[category.id] = {
                    "id": category.id,
                    "name": category.name,
                    "courses": [],
                }

            grouped_categories[category.id]["courses"].append(
                {
                    "id": course.id,
                    "title": course.title,
                    "short_description": course.short_description,
                    "thumbnail": course.thumbnail,
                    "level": course.level,
                    "language": course.language,
                    "discount_price": course.discount_price,
                    "price": course.price,
                }
            )

        return {
            "data": list(grouped_categories.values()),
            "pagination": {
                "page": page,
                "page_size": page_size,
                "total": total,
                "total_pages": total_pages,
                "has_next": page < total_pages,
                "has_previous": page > 1,
            },
        }
