from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    is_verified: bool

    model_config = {"from_attributes": True}


class MeResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    is_verified: bool
    created_at: datetime

    model_config = {"from_attributes": True}
