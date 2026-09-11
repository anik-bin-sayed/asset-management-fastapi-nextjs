from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.course import Course


class CourseRepository:

    @staticmethod
    def get_upcoming_courses(
        db: Session,
        skip: int,
        limit: int,
    ):
        return (
            db.query(Course)
            .filter(
                Course.start_date.isnot(None),
                Course.start_date > datetime.now(),
            )
            .order_by(Course.start_date.asc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def count_upcoming_courses(db: Session):
        return (
            db.query(func.count(Course.id))
            .filter(
                Course.start_date.isnot(None),
                Course.start_date > datetime.now(),
            )
            .scalar()
        )
