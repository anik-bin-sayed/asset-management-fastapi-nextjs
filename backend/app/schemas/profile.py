from datetime import date

from pydantic import BaseModel, HttpUrl, field_validator


class UpdateProfileSchema(BaseModel):
    name: str | None = None
    phone: str | None = None
    username: str | None = None
    gender: str | None = None
    date_of_birth: date | None = None

    bio: str | None = None

    address: str | None = None
    city: str | None = None
    country: str | None = None

    website: HttpUrl | None = None
    github: HttpUrl | None = None
    linkedin: HttpUrl | None = None

    @field_validator("website", "github", "linkedin", mode="before")
    @classmethod
    def empty_string_to_none(cls, value):
        if value == "":
            return None
        return value
