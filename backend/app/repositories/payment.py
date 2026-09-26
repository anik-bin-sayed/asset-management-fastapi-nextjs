from datetime import datetime

from sqlalchemy.orm import Session

from app.models.payment import Payment, PaymentStatus


class PaymentRepository:

    @staticmethod
    def get_by_id(
        db: Session,
        payment_id: int,
    ):
        return (
            db.query(Payment)
            .filter(Payment.id == payment_id)
            .first()
        )

    @staticmethod
    def get_by_enrollment(
        db: Session,
        enrollment_id: int,
    ):
        return (
            db.query(Payment)
            .filter(Payment.enrollment_id == enrollment_id)
            .first()
        )

    @staticmethod
    def get_by_transaction_id(
        db: Session,
        transaction_id: str,
    ):
        return (
            db.query(Payment)
            .filter(Payment.transaction_id == transaction_id)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        enrollment_id: int,
        amount,
    ):
        payment = Payment(
            enrollment_id=enrollment_id,
            amount=amount,
            status=PaymentStatus.PENDING,
        )

        db.add(payment)
        db.commit()
        db.refresh(payment)

        return payment

    @staticmethod
    def mark_success(
        db: Session,
        payment: Payment,
        transaction_id: str,
    ):
        payment.status = PaymentStatus.SUCCESS
        payment.transaction_id = transaction_id
        payment.paid_at = datetime.utcnow()

        db.commit()
        db.refresh(payment)

        return payment

    @staticmethod
    def mark_failed(
        db: Session,
        payment: Payment,
    ):
        payment.status = PaymentStatus.FAILED

        db.commit()
        db.refresh(payment)

        return payment

    @staticmethod
    def mark_cancelled(
        db: Session,
        payment: Payment,
    ):
        payment.status = PaymentStatus.CANCELLED

        db.commit()
        db.refresh(payment)

        return payment