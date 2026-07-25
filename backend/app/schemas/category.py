from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str
    description: str | None = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: str | None

    class Config:
        from_attributes = True


class CategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
