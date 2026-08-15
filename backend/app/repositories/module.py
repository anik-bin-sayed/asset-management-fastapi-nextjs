from sqlalchemy.orm import Session

from app.models.module import Module


class ModuleRepository:

    @staticmethod
    def get_by_course(
        db: Session,
        course_id: int,
    ):
        return (
            db.query(Module)
            .filter(Module.course_id == course_id)
            .order_by(Module.position.asc())
            .all()
        )
