import app.core.cloudinary_config

from cloudinary import uploader
from fastapi import UploadFile


class CloudinaryService:

    @staticmethod
    async def upload_avatar(file: UploadFile, user_id: str):

        result = uploader.upload(
            file.file,
            folder="learnhub/avatar",
            public_id=user_id,
            overwrite=True,
            resource_type="image",
        )

        return result["secure_url"]
