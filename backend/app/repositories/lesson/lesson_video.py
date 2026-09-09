from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.lesson.lesson_video import LessonVideo
from app.schemas.lesson.lesson_video import (
    LessonVideoCreate,
    LessonVideoUpdate,
)


class LessonVideoRepository:

    @staticmethod
    def create(
        db: Session,
        data: LessonVideoCreate,
    ) -> LessonVideo:

        video = LessonVideo(
            **data.model_dump(),
        )

        db.add(video)
        db.commit()
        db.refresh(video)

        return video

    @staticmethod
    def get_by_id(
        db: Session,
        video_id: int,
    ) -> LessonVideo | None:

        return (
            db.query(LessonVideo)
            .filter(
                LessonVideo.id == video_id,
            )
            .first()
        )

    @staticmethod
    def get_by_lesson_id(
        db: Session,
        lesson_id: int,
    ) -> list[LessonVideo]:

        return (
            db.query(LessonVideo)
            .filter(
                LessonVideo.lesson_id == lesson_id,
            )
            .order_by(
                LessonVideo.position.asc(),
            )
            .all()
        )

    @staticmethod
    def update(
        db: Session,
        video: LessonVideo,
        data: LessonVideoUpdate,
    ) -> LessonVideo:

        update_data = data.model_dump(
            exclude_unset=True,
        )

        for field, value in update_data.items():
            setattr(
                video,
                field,
                value,
            )

        db.commit()
        db.refresh(video)

        return video

    @staticmethod
    def delete(
        db: Session,
        video: LessonVideo,
    ) -> None:

        db.delete(video)
        db.commit()

    @staticmethod
    def get_lesson_video_stats(
        db: Session,
        lesson_id: int,
    ):
        result = (
            db.query(
                func.count(LessonVideo.id),
                func.coalesce(func.sum(LessonVideo.duration), 0),
            )
            .filter(LessonVideo.lesson_id == lesson_id)
            .first()
        )

        return {
            "video_count": result[0],
            "total_duration": result[1],
        }

    @staticmethod
    def delete(
        db: Session,
        video: LessonVideo,
    ) -> None:

        # Delete related progress first
        db.query(LessonVideo).filter(LessonVideo.id == video.id).delete(
            synchronize_session=False
        )

        # Delete video
        db.delete(video)

        db.commit()
