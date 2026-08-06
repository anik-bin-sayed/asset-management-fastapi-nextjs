from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.free_video import FreeCourseCreate
from app.services.free_course import FreeCourseService
from app.schemas.free_video import (
    CourseLanguage,
    FreeCourseUpdate,
)
from app.core.dependencies import admin_instructor_required

router = APIRouter(
    prefix="/free-courses",
    tags=["Free Courses"],
)


@router.post("/")
async def create_course(
    title: str = Form(...),
    short_description: str = Form(...),
    description: str = Form(...),
    language: str = Form(...),
    video_url: str = Form(...),
    duration: str | None = Form(None),
    tags: str | None = Form(None),
    thumbnail: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    data = FreeCourseCreate(
        title=title,
        short_description=short_description,
        description=description,
        language=language,
        video_url=video_url,
        duration=duration,
        tags=tags.split(",") if tags else [],
    )

    return await FreeCourseService.create(
        db=db,
        data=data,
        thumbnail=thumbnail,
        current_user=current_user,
    )


@router.get("/")
def get_free_courses(
    db: Session = Depends(get_db),
):
    return FreeCourseService.get_first_eight(db)


@router.get("/all")
def get_all_free_courses(
    page: int = 1,
    limit: int = 9,
    db: Session = Depends(get_db),
):
    return FreeCourseService.get_all(
        db=db,
        page=page,
        limit=limit,
    )


@router.patch("/{course_id}")
async def update_free_course(
    course_id: int,
    data: FreeCourseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FreeCourseService.update(
        db=db,
        course_id=course_id,
        data=data,
        thumbnail=None,
        current_user=current_user,
    )


@router.delete("/{course_id}")
async def delete_free_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await FreeCourseService.delete(
        db=db,
        course_id=course_id,
        current_user=current_user,
    )
