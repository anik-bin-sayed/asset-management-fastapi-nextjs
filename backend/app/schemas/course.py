from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime

from app.models.course import CourseType

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
    course_type: CourseType = CourseType.FREE
    status: CourseStatus = CourseStatus.PUBLISHED
    language: CourseLanguage = CourseLanguage.BANGLA

    start_date: datetime | None = None
    end_date: datetime | None = None

    category_id: int | None = None


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
    course_type: str

    start_date: datetime | None
    end_date: datetime | None

    level: CourseLevel
    language: CourseLanguage
    status: CourseStatus


class CourseListResponse(BaseModel):

    data: list[CourseResponse]

    total: int
    page: int
    limit: int
    total_pages: int
