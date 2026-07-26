from sqlalchemy.orm import Session

from app.models.course import Course


class CourseRepository:

    @staticmethod
    def create(db: Session, course: Course):

        db.add(course)
        db.commit()
        db.refresh(course)

        return course

    @staticmethod
    def get_by_slug(db: Session, slug: str):

        return db.query(Course).filter(Course.slug == slug).first()

    @staticmethod
    def get_all(
        db: Session,
        search: str | None = None,
        category_id: int | None = None,
        status: str | None = None,
        level: str | None = None,
        language: str | None = None,
        skip: int = 0,
        limit: int = 10,
    ):

        query = db.query(Course)

        if search:
            query = query.filter(Course.title.ilike(f"%{search}%"))

        if category_id:
            query = query.filter(Course.category_id == category_id)

        if status:
            query = query.filter(Course.status == status)

        if level:
            query = query.filter(Course.level == level)

        if language:
            query = query.filter(Course.language == language)

        total = query.count()

        courses = (
            query.order_by(Course.created_at.desc()).offset(skip).limit(limit).all()
        )

        return courses, total
