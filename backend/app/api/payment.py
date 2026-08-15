from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import student_required, admin_instructor_required
from app.dependencies.database import get_db

from app.models.user import User

from app.schemas.payment import PaymentCreate, PaymentResponse, PaymentSuccessRequest

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


@router.post("/{payment_id}/success", response_model=PaymentResponse)
def mark_payment_success(
    payment_id: int,
    data: PaymentSuccessRequest,
    db: Session = Depends(get_db),
    # current_user: User = Depends(admin_instructor_required),
):
    return PaymentService.mark_success(
        db=db,
        payment_id=payment_id,
        transaction_id=data.transaction_id,
    )
