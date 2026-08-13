from fastapi import Depends, HTTPException, status

from app.models.user import User
from app.core.dependencies import get_current_user


def get_current_student(
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only students can enroll in courses",
        )

    return current_user
