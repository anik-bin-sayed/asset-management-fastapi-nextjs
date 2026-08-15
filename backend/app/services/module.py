from sqlalchemy.orm import Session

from app.repositories.module import ModuleRepository
from app.services.course_access import CourseAccessService


class ModuleService:

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
