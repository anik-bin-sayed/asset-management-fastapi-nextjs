from datetime import datetime

from fastapi import HTTPException, status

from sqlalchemy.orm import Session


from app.repositories.enrollment_repository import EnrollmentRepository
from app.models.enrollment import EnrollmentStatus

from app.models.course import CourseType
from app.repositories.payment import PaymentRepository
from app.models.payment import PaymentStatus, Payment


class PaymentService:

    @staticmethod
    def create(db: Session, enrollment_id: int, current_user):
        enrollment = EnrollmentRepository.get_by_id(db, enrollment_id)

        if not enrollment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found"
            )

        if enrollment.student_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You cannot create payment for this enrollment",
            )

        if enrollment.status != EnrollmentStatus.PENDING:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This enrollment cannot be paid",
            )

        course = enrollment.course

        print("course ------------------", course.course_type)

        if course.course_type != CourseType.PAID:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This course does not require payment",
            )

        existing_payment = PaymentRepository.get_by_enrollment(
            db,
            enrollment_id,
        )

        if existing_payment:
            return existing_payment

        amount = (
            course.discount_price if course.discount_price is not None else course.price
        )

        payment = Payment(
            enrollment_id=enrollment.id,
            amount=amount,
            status=PaymentStatus.PENDING,
        )

        return PaymentRepository.create(db, payment)

    @staticmethod
    def mark_success(db: Session, payment_id: int, transaction_id: str):
        payment = db.query(Payment).filter(Payment.id == payment_id).first()

        if not payment:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment")

        if payment.status == PaymentStatus.SUCCESS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment is already successful",
            )

        payment.status = PaymentStatus.SUCCESS
        payment.transaction_id = transaction_id
        payment.paid_at = datetime.utcnow()

        enrollment = payment.enrollment

        enrollment.status = EnrollmentStatus.ACTIVE
        enrollment.activated_at = datetime.utcnow()

        db.commit()
        db.refresh(payment)

        return payment
