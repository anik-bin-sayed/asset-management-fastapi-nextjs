from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.lesson import Lesson, LessonVideo
from app.schemas.lesson.lesson import LessonCreate, LessonUpdate


class LessonRepository:
    @staticmethod
    def create(
        db: Session,
        data: LessonCreate,
    ) -> Lesson:
        lesson = Lesson(
            title=data.title,
            description=data.description,
            position=data.position,
            course_id=data.course_id,
        )

        db.add(lesson)
        db.commit()
        db.refresh(lesson)

        return lesson

    @staticmethod
    def get_by_course_id(
        db: Session,
        course_id: int,
    ) -> list[Lesson]:

        return (
            db.query(
                Lesson,
                func.count(LessonVideo.id).label("video_count"),
                func.coalesce(
                    func.sum(LessonVideo.duration),
                    0,
                ).label("total_seconds"),
            )
            .outerjoin(
                LessonVideo,
                LessonVideo.lesson_id == Lesson.id,
            )
            .filter(
                Lesson.course_id == course_id,
            )
            .group_by(Lesson.id)
            .order_by(Lesson.position.asc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        lesson_id: int,
    ) -> Lesson | None:

        return (
            db.query(
                Lesson,
                func.count(LessonVideo.id).label(
                    "video_count",
                ),
                func.coalesce(
                    func.sum(LessonVideo.duration),
                    0,
                ).label(
                    "total_seconds",
                ),
            )
            .outerjoin(
                LessonVideo,
                LessonVideo.lesson_id == Lesson.id,
            )
            .filter(
                Lesson.id == lesson_id,
            )
            .group_by(
                Lesson.id,
            )
            .first()
        )

    @staticmethod
    def delete(db: Session, lesson: Lesson) -> None:
        db.delete(lesson)
        db.commit()

    @staticmethod
    def update(
        db: Session,
        lesson: Lesson,
        data: LessonUpdate,
    ) -> Lesson:

        update_data = data.model_dump(
            exclude_unset=True,
        )

        for field, value in update_data.items():
            setattr(
                lesson,
                field,
                value,
            )

        db.commit()
        db.refresh(lesson)

        return lesson
