from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.lesson.lesson import LessonCreate, LessonResponse, LessonUpdate
from app.services.lesson.lesson import LessonService

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"],
)


@router.post(
    "/",
    response_model=LessonResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_lesson(
    data: LessonCreate,
    db: Session = Depends(get_db),
):
    return LessonService.create_lesson(
        db=db,
        data=data,
    )


@router.get(
    "/course/{course_id}",
    response_model=list[LessonResponse],
)
def get_course_lessons(
    course_id: int,
    db: Session = Depends(get_db),
):
    return LessonService.get_course_lessons(
        db,
        course_id,
    )


@router.delete(
    "/{lesson_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
):

    try:
        LessonService.delete_lesson(
            db=db,
            lesson_id=lesson_id,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.get(
    "/{lesson_id}",
    response_model=LessonResponse,
)
def get_lesson_by_id(
    lesson_id: int,
    db: Session = Depends(get_db),
):

    try:
        return LessonService.get_lesson_by_id(
            db=db,
            lesson_id=lesson_id,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.put(
    "/{lesson_id}",
    response_model=LessonResponse,
)
def update_lesson(
    lesson_id: int,
    data: LessonUpdate,
    db: Session = Depends(get_db),
):

    try:
        return LessonService.update_lesson(
            db=db,
            lesson_id=lesson_id,
            data=data,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=404,
            detail=str(error),
        )
