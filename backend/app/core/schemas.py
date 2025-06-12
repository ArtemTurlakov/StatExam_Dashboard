
from pydantic import BaseModel, Field


class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

    class Config:
        from_attributes=True

class User(UserBase):
    id: str

    class Config:
        from_attributes=True