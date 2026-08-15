from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.payment import PaymentStatus


class PaymentCreate(BaseModel):
    enrollment_id: int


class PaymentSuccessRequest(BaseModel):
    transaction_id: str


class PaymentResponse(BaseModel):
    id: int
    enrollment_id: int
    amount: Decimal
    status: PaymentStatus
    transaction_id: str | None = None
    paid_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
