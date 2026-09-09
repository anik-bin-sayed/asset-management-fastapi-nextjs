from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.dependencies.database import get_db

from app.schemas.lesson.lesson_video import (
    LessonVideoCreate,
    LessonVideoUpdate,
    LessonVideoResponse,
)

from app.services.lesson.lesson_video import (
    LessonVideoService,
)

router = APIRouter(
    prefix="/lesson-videos",
    tags=["Lesson Videos"],
)


@router.post(
    "/",
    response_model=LessonVideoResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_video(
    data: LessonVideoCreate,
    db: Session = Depends(get_db),
):

    try:
        return LessonVideoService.create_video(
            db=db,
            data=data,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.get(
    "/{video_id}",
    response_model=LessonVideoResponse,
)
def get_video_by_id(
    video_id: int,
    db: Session = Depends(get_db),
):

    try:
        return LessonVideoService.get_video_by_id(
            db=db,
            video_id=video_id,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.get(
    "/lesson/{lesson_id}",
    response_model=list[LessonVideoResponse],
)
def get_lesson_videos(
    lesson_id: int,
    db: Session = Depends(get_db),
):

    return LessonVideoService.get_lesson_videos(
        db=db,
        lesson_id=lesson_id,
    )


@router.patch(
    "/{video_id}",
    response_model=LessonVideoResponse,
)
def update_video(
    video_id: int,
    data: LessonVideoUpdate,
    db: Session = Depends(get_db),
):

    try:
        return LessonVideoService.update_video(
            db=db,
            video_id=video_id,
            data=data,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.delete(
    "/{video_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_video(
    video_id: int,
    db: Session = Depends(get_db),
):

    try:
        LessonVideoService.delete_video(
            db=db,
            video_id=video_id,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.get(
    "/lesson/{lesson_id}/stats",
)
def get_lesson_video_stats(
    lesson_id: int,
    db: Session = Depends(get_db),
):
    return LessonVideoService.get_lesson_video_stats(
        db,
        lesson_id,
    )


@router.delete(
    "/{video_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_lesson_video(
    video_id: int,
    db: Session = Depends(get_db),
):

    deleted = LessonVideoService.delete_video(
        db=db,
        video_id=video_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson video not found",
        )

    return None
