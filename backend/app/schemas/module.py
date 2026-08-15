from pydantic import BaseModel, ConfigDict


class ModuleCreate(BaseModel):
    title: str
    description: str | None = None
    position: int = 0


class ModuleUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    position: int | None = None


class ModuleResponse(BaseModel):
    id: int
    title: str
    description: str | None
    position: int

    model_config = ConfigDict(from_attributes=True)
