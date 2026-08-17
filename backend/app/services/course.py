from fastapi import HTTPException, UploadFile, Depends

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.course import Course, CourseStatus
from app.repositories.category_repository import CategoryRepository
from app.repositories.course_repository import CourseRepository
from app.utils.slug import generate_slug

from app.schemas.course import CourseCreate
from app.utils.cloudinary import upload_image, delete_image
from app.core.dependencies import admin_instructor_required


class CourseService:

    @staticmethod
    async def create(
        db: Session,
        data: CourseCreate,
        thumbnail: UploadFile,
        current_user: User,
    ):
        # Check category
        category = CategoryRepository.get_by_id(
            db,
            data.category_id,
        )

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found",
            )

        # Validate discount price
        if data.discount_price is not None and data.discount_price > data.price:
            raise HTTPException(
                status_code=400,
                detail="Discount price cannot be greater than price.",
            )

        # Generate slug
        slug = generate_slug(data.title)

        # Check duplicate course
        if CourseRepository.get_by_slug(db, slug):
            raise HTTPException(
                status_code=400,
                detail="Course already exists.",
            )

        # Upload thumbnail
        image = None

        if thumbnail:
            image = await upload_image(
                thumbnail,
                folder="courses",
            )

        # Create course
        course = Course(
            title=data.title,
            slug=slug,
            short_description=data.short_description,
            description=data.description,
            price=data.price,
            discount_price=data.discount_price,
            level=data.level,
            language=data.language,
            course_type=data.course_type,
            status=data.status,
            category_id=data.category_id,
            instructor_id=current_user.id,
            start_date=data.start_date,
            end_date=data.end_date,
            thumbnail=image["secure_url"] if image else None,
            thumbnail_public_id=image["public_id"] if image else None,
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

    @staticmethod
    async def delete_course(
        db: Session,
        course_id: int,
        current_user: User = Depends(admin_instructor_required),
    ):
        course = CourseRepository.get_by_id(db, course_id)

        if not course:
            raise HTTPException(
                status_code=404,
                detail="Course not found.",
            )

        if course.thumbnail_public_id:
            delete_image(course.thumbnail_public_id)

        CourseRepository.delete(
            db,
            course,
        )

        return {"message": "Course deleted successfully."}
