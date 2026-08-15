from pydantic import BaseModel, ConfigDict


class ModuleResponse(BaseModel):
    id: int
    title: str
    description: str | None
    position: int

    model_config = ConfigDict(from_attributes=True)
