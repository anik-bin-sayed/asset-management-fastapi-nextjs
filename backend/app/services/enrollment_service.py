from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.course import CourseStatus
from app.models.enrollment import Enrollment, EnrollmentStatus
from app.repositories.course_repository import CourseRepository
from app.repositories.enrollment_repository import EnrollmentRepository


class EnrollmentService:

    @staticmethod
    def create(
        db: Session,
        course_id: int,
        current_user,
    ):

        course = CourseRepository.get_by_id(
            db,
            course_id,
        )

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Course not found",
            )

        # Course must be published
        if course.status != CourseStatus.PUBLISHED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This course is not available for enrollment",
            )

        # Enrollment must happen before course starts
        now = datetime.utcnow()

        if now >= course.start_date:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Enrollment is closed because the course has already started",
            )

        # Check duplicate enrollment
        existing_enrollment = EnrollmentRepository.get_by_student_and_course(
            db,
            current_user.id,
            course_id,
        )

        if existing_enrollment:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="You are already enrolled in this course",
            )

        enrollment = Enrollment(
            student_id=current_user.id,
            course_id=course_id,
            status=EnrollmentStatus.PENDING,
        )

        return EnrollmentRepository.create(
            db,
            enrollment,
        )
