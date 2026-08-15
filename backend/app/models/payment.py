from datetime import datetime
from enum import Enum
from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String, DateTime, Enum as sqlEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class PaymentStatus(str, Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"


class Payment(Base):
    __tablename__ = "payments"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    enrollment_id: Mapped[int] = mapped_column(
        ForeignKey(
            "enrollments.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
    )

    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    status: Mapped[PaymentStatus] = mapped_column(
        sqlEnum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False
    )

    transaction_id: Mapped[str | None] = mapped_column(
        String(255), unique=True, nullable=True
    )

    paid_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    enrollment = relationship("Enrollment", back_populates="payment")
