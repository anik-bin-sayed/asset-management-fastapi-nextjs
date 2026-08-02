from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.core.dependencies import get_current_user, admin_required
from app.models.user import User
from app.repositories.user_repository import UserRepository

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("")
async def get_users(
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    admin: User = Depends(admin_required),
):
    offset = (page - 1) * limit

    users, total = UserRepository.get_all_users(
        db=db,
        offset=offset,
        limit=limit,
        search=search,
    )

    return {
        "users": users,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (total + limit - 1) // limit,
        },
    }
