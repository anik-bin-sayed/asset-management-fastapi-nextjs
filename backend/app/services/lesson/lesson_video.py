from sqlalchemy.orm import Session

from app.models.lesson.lesson import Lesson
from app.models.lesson.lesson_video import LessonVideo

from app.repositories.lesson.lesson_video import (
    LessonVideoRepository,
)

from app.schemas.lesson.lesson_video import (
    LessonVideoCreate,
    LessonVideoUpdate,
)


class LessonVideoService:

    @staticmethod
    def create_video(
        db: Session,
        data: LessonVideoCreate,
    ) -> LessonVideo:

        lesson = (
            db.query(Lesson)
            .filter(
                Lesson.id == data.lesson_id,
            )
            .first()
        )

        if not lesson:
            raise ValueError("Lesson not found")

        return LessonVideoRepository.create(
            db=db,
            data=data,
        )

    @staticmethod
    def get_video_by_id(
        db: Session,
        video_id: int,
    ) -> LessonVideo:

        video = LessonVideoRepository.get_by_id(
            db=db,
            video_id=video_id,
        )

        if not video:
            raise ValueError("Lesson video not found")

        return video

    @staticmethod
    def get_lesson_videos(
        db: Session,
        lesson_id: int,
    ) -> list[LessonVideo]:

        return LessonVideoRepository.get_by_lesson_id(
            db=db,
            lesson_id=lesson_id,
        )

    @staticmethod
    def update_video(
        db: Session,
        video_id: int,
        data: LessonVideoUpdate,
    ) -> LessonVideo:

        video = LessonVideoService.get_video_by_id(
            db=db,
            video_id=video_id,
        )

        return LessonVideoRepository.update(
            db=db,
            video=video,
            data=data,
        )

    @staticmethod
    def delete_video(
        db: Session,
        video_id: int,
    ) -> None:

        video = LessonVideoService.get_video_by_id(
            db=db,
            video_id=video_id,
        )

        LessonVideoRepository.delete(
            db=db,
            video=video,
        )

    @staticmethod
    def get_lesson_video_stats(
        db: Session,
        lesson_id: int,
    ):

        stats = LessonVideoRepository.get_lesson_video_stats(
            db,
            lesson_id,
        )

        total_seconds = stats["total_duration"]

        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60

        if hours > 0:
            duration = f"{hours}h {minutes}m {seconds}s"
        elif minutes > 0:
            duration = f"{minutes}m {seconds}s"
        else:
            duration = f"{seconds}s"

        return {
            "video_count": stats["video_count"],
            "total_duration": duration,
            "total_seconds": total_seconds,
        }

    @staticmethod
    def delete_video(
        db: Session,
        video_id: int,
    ) -> bool:

        video = LessonVideoRepository.get_by_id(
            db=db,
            video_id=video_id,
        )

        if not video:
            return False

        LessonVideoRepository.delete(
            db=db,
            video=video,
        )

        return True
