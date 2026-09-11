from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.services.upcoming_course import CourseService

router = APIRouter(
    prefix="/upcoming-courses",
    tags=["Courses"],
)


@router.get("/upcoming")
def get_upcoming_courses(
    page: int = Query(
        1,
        ge=1,
        description="Page number",
    ),
    page_size: int = Query(
        8,
        ge=1,
        le=50,
        description="Number of courses per page",
    ),
    db: Session = Depends(get_db),
):
    return CourseService.get_upcoming_courses(
        db=db,
        page=page,
        page_size=page_size,
    )
