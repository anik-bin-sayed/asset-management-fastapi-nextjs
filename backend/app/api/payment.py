from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import student_required
from app.dependencies.database import get_db

from app.models.user import User

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
)

from app.services.payment import PaymentService

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


@router.post(
    "",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_payment(
    data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(student_required),
):
    return PaymentService.create(
        db=db,
        enrollment_id=data.enrollment_id,
        current_user=current_user,
    )
