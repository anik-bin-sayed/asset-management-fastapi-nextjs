from sqlalchemy.orm import Session

from app.models.enrollment import Enrollment


class EnrollmentRepository:

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
    def get_by_id(db: Session, enrollment_id: int):
        return db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()

    @staticmethod
    def create(
        db: Session,
        enrollment: Enrollment,
    ):
        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)

        return enrollment
