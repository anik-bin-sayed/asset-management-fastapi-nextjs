from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.services.cloudinary_service import CloudinaryService

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.patch("/avatar")
async def upload_user_avatar(
    avatar: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    if avatar.content_type not in [
        "image/jpeg",
        "image/png",
        "image/webp",
    ]:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed.",
        )

    image_url = await CloudinaryService.upload_avatar(
        avatar,
        current_user.id,
    )

    current_user.avatar = image_url

    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return {
        "message": "Avatar updated successfully",
        "avatar": image_url,
    }
