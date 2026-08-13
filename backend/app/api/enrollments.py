from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import student_required
from app.dependencies.database import get_db

from app.models.user import User

from app.schemas.enrollment import (
    EnrollmentCreate,
    EnrollmentResponse,
)

from app.services.enrollment_service import EnrollmentService

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollments"],
)


@router.post(
    "",
    response_model=EnrollmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_enrollment(
    data: EnrollmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(student_required),
):
    return EnrollmentService.create(
        db=db,
        course_id=data.course_id,
        current_user=current_user,
    )
