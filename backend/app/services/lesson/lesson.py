from sqlalchemy.orm import Session

from app.repositories.lesson.lesson import LessonRepository
from app.schemas.lesson.lesson import LessonCreate, LessonUpdate


class LessonService:

    @staticmethod
    def create_lesson(
        db: Session,
        data: LessonCreate,
    ):
        return LessonRepository.create(
            db=db,
            data=data,
        )

    @staticmethod
    def get_course_lessons(
        db: Session,
        course_id: int,
    ):
        rows = LessonRepository.get_by_course_id(
            db,
            course_id,
        )

        result = []

        for lesson, video_count, total_seconds in rows:

            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            seconds = total_seconds % 60

            if hours > 0:
                duration = f"{hours}h {minutes}m {seconds}s"
            elif minutes > 0:
                duration = f"{minutes}m {seconds}s"
            else:
                duration = f"{seconds}s"

            result.append(
                {
                    "id": lesson.id,
                    "title": lesson.title,
                    "description": lesson.description,
                    "position": lesson.position,
                    "course_id": lesson.course_id,
                    "video_count": video_count,
                    "total_duration": duration,
                    "created_at": lesson.created_at,
                    "updated_at": lesson.updated_at,
                }
            )

        return result

    @staticmethod
    def delete_lesson(
        db: Session,
        lesson_id: int,
    ) -> None:

        lesson = LessonRepository.get_by_id(
            db=db,
            lesson_id=lesson_id,
        )

        if not lesson:
            raise ValueError(
                "Lesson not found",
            )

        LessonRepository.delete(
            db=db,
            lesson=lesson,
        )

    @staticmethod
    def get_lesson_by_id(
        db: Session,
        lesson_id: int,
    ):

        result = LessonRepository.get_by_id(
            db=db,
            lesson_id=lesson_id,
        )

        if not result:
            raise ValueError(
                "Lesson not found",
            )

        lesson, video_count, total_seconds = result

        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60

        if hours > 0:
            total_duration = f"{hours}h {minutes}m {seconds}s"
        elif minutes > 0:
            total_duration = f"{minutes}m {seconds}s"
        else:
            total_duration = f"{seconds}s"

        return {
            "id": lesson.id,
            "title": lesson.title,
            "description": lesson.description,
            "position": lesson.position,
            "course_id": lesson.course_id,
            "video_count": video_count,
            "total_seconds": total_seconds,
            "total_duration": total_duration,
            "created_at": lesson.created_at,
            "updated_at": lesson.updated_at,
        }

    @staticmethod
    def update_lesson(
        db: Session,
        lesson_id: int,
        data: LessonUpdate,
    ):

        lesson = LessonRepository.get_by_id(
            db=db,
            lesson_id=lesson_id,
        )

        if not lesson:
            raise ValueError(
                "Lesson not found",
            )

        return LessonRepository.update(
            db=db,
            lesson=lesson,
            data=data,
        )
