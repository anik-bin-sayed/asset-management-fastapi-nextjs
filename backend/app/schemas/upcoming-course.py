from pydantic import BaseModel


class UpcomingCourseItem(BaseModel):
    id: int
    title: str
    description: str | None = None
    thumbnail: str | None = None
    duration: str | None = None
    language: str | None = None

    total_lessons: int = 0


class UpcomingCategory(BaseModel):
    id: int
    name: str
    courses: list[UpcomingCourseItem]


class PaginationResponse(BaseModel):
    page: int
    page_size: int
    total: int
    total_pages: int
    has_next: bool
    has_previous: bool


class UpcomingCourseResponse(BaseModel):
    data: list[UpcomingCategory]
    pagination: PaginationResponse
