from sqlalchemy.orm import Session

from app.models.payment import Payment


class PaymentRepository:
    @staticmethod
    def get_by_enrollment(db: Session, enrollment_id: int):
        return db.query(Payment).filter(Payment.enrollment_id == enrollment_id).first()

    @staticmethod
    def create(db: Session, payment: Payment):
        db.add(payment)
        db.commit()
        db.refresh(payment)

        return payment
