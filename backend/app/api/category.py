from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.category import CategoryCreate, CategoryResponse, CategoryUpdate
from app.models.user import User
from app.core.dependencies import admin_required
from app.services.category_service import CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post(
    "",
    response_model=CategoryResponse,
)
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return CategoryService.create(
        db,
        data,
    )


@router.patch(
    "/{category_id}",
    response_model=CategoryResponse,
)
def update_category(
    data: CategoryUpdate,
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return CategoryService.update(
        db,
        category_id,
        data,
    )


@router.get(
    "",
    response_model=list[CategoryResponse],
)
def get_categories(
    db: Session = Depends(get_db),
):
    return CategoryService.get_all(db)


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return CategoryService.delete(
        db,
        category_id,
    )
