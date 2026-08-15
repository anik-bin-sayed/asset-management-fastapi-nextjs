from sqlalchemy.orm import Session

from app.models.module import Module


class ModuleRepository:

    @staticmethod
    def create(db: Session, module: Module):
        db.add(module)
        db.commit()
        db.refresh(module)

        return module

    @staticmethod
    def get_by_id(db: Session, module_id: int):
        return db.query(Module).filter(Module.id == module_id).first()

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
