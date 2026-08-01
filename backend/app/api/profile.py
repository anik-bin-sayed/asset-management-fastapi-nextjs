from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.models.user import User
from app.dependencies.database import get_db
from app.core.dependencies import get_current_user
from app.services.cloudinary_service import CloudinaryService
from app.schemas.profile import UpdateProfileSchema

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


@router.patch("/edit/{user_id}")
async def update_profile(
    user_id: str,
    data: UpdateProfileSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    if user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="You are not allowed to edit this profile."
        )

    update_data = data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if field in ["website", "github", "linkedin"] and value is not None:
            value = str(value)

        setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": current_user,
    }
