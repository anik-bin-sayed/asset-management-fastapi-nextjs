from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.models.course import (
    CourseLanguage,
    CourseLevel,
    CourseStatus,
)


class CourseCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=255)
    short_description: str
    description: str

    price: Decimal
    discount_price: Decimal | None = None

    level: CourseLevel = CourseLevel.BEGINNER
    language: CourseLanguage = CourseLanguage.BANGLA

    category_id: int


class CourseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str

    short_description: str
    description: str

    thumbnail: str | None

    price: Decimal
    discount_price: Decimal | None

    level: CourseLevel
    language: CourseLanguage
    status: CourseStatus


class CourseListResponse(BaseModel):

    data: list[CourseResponse]

    total: int
    page: int
    limit: int
    total_pages: int
