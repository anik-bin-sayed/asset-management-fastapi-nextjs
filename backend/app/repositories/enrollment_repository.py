from sqlalchemy.orm import Session

from app.models.enrollment import Enrollment, EnrollmentStatus


class EnrollmentRepository:

    @staticmethod
    def get_by_id(
        db: Session,
        enrollment_id: int,
    ):
        return (
            db.query(Enrollment)
            .filter(Enrollment.id == enrollment_id)
            .first()
        )

    @staticmethod
    def get_by_student_and_course(
        db: Session,
        student_id: str,
        course_id: int,
    ):
        return (
            db.query(Enrollment)
            .filter(
                Enrollment.student_id == student_id,
                Enrollment.course_id == course_id,
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        student_id: str,
        course_id: int,
    ):
        enrollment = Enrollment(
            student_id=student_id,
            course_id=course_id,
            status=EnrollmentStatus.PENDING,
        )

        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)

        return enrollment

    @staticmethod
    def update_status(
        db: Session,
        enrollment: Enrollment,
        status: EnrollmentStatus,
    ):
        enrollment.status = status

        db.commit()
        db.refresh(enrollment)

        return enrollment