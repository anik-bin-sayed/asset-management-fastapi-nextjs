from fastapi import HTTPException, status

from sqlalchemy.orm import Session

from app.models.module import Module

from app.repositories.module import ModuleRepository
from app.services.course_access import CourseAccessService
from app.repositories.course_repository import CourseRepository


class ModuleService:

    @staticmethod
    def create(db: Session, course_id: int, data):
        course = CourseRepository.get_by_id(db, course_id)

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found",
            )

        module = Module(
            title=data.title,
            description=data.description,
            position=data.position,
            course_id=course_id,
        )

        return ModuleRepository.create(
            db,
            module,
        )

    @staticmethod
    def get_course_modules(
        db: Session,
        course_id: int,
        student_id: str,
    ):
        CourseAccessService.check_access(
            db=db,
            student_id=student_id,
            course_id=course_id,
        )

        return ModuleRepository.get_by_course(
            db=db,
            course_id=course_id,
        )
