from pydantic import BaseModel, ConfigDict
from app.models.free_video import CourseLanguage, CourseStatus

from datetime import datetime


class FreeCourseCreate(BaseModel):
    title: str
    short_description: str
    description: str
    language: CourseLanguage
    video_url: str
    duration: str | None = None
    tags: list[str] | None = None
    thumbnail: str | None = None


class FreeCourseUpdate(BaseModel):
    title: str | None = None
    short_description: str | None = None
    description: str | None = None
    language: CourseLanguage | None = None
    video_url: str | None = None
    duration: str | None = None
    tags: list[str] | None = None
    thumbnail: str | None = None
    status: CourseStatus | None = None


class FreeCourseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    short_description: str
    description: str
    language: CourseLanguage
    status: CourseStatus
    thumbnail: str | None = None
    thumbnail_public_id: str | None = None
    video_url: str
    duration: str | None = None
    tags: list[str] | None = None
    created_by: str
    created_at: datetime
    updated_at: datetime
    published_at: datetime | None = None
