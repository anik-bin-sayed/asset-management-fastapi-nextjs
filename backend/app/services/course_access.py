from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.enrollment import EnrollmentRepository


class CourseAccessService:

    @staticmethod
    def check_access(
        db: Session,
        student_id: str,
        course_id: int,
    ):
        enrollment = EnrollmentRepository.get_active_enrollment(
            db=db,
            student_id=student_id,
            course_id=course_id,
        )

        if not enrollment:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this course",
            )

        return enrollment
