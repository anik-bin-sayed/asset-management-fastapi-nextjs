from fastapi import APIRouter, Depends
from fastapi import Query

from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.dependencies.database import get_db

from app.models.user import User

from app.schemas.course import CourseCreate, CourseResponse, CourseListResponse

from app.schemas.module import ModuleResponse
from app.services.module import ModuleService

from app.services.course import CourseService
from app.core.dependencies import admin_instructor_required, student_required

router = APIRouter(
    prefix="/courses",
    tags=["Courses"],
)


@router.post(
    "",
    response_model=CourseResponse,
)
def create_course(
    data: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_instructor_required),
):

    return CourseService.create(
        db,
        data,
        current_user,
    )


@router.get(
    "",
    response_model=CourseListResponse,
)
def get_courses(
    search: str | None = Query(None),
    category_id: int | None = Query(None),
    status: str | None = Query(None),
    level: str | None = Query(None),
    language: str | None = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return CourseService.get_all(
        db=db,
        search=search,
        category_id=category_id,
        status=status,
        level=level,
        language=language,
        page=page,
        limit=limit,
    )


@router.get(
    "/{course_id}/modules",
    response_model=list[ModuleResponse],
)
def get_course_modules(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(student_required),
):
    return ModuleService.get_course_modules(
        db=db,
        course_id=course_id,
        student_id=current_user.id,
    )
