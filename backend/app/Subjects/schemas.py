from pydantic import BaseModel, Field


class SubjectsDTO(BaseModel):
    subject_id: int
    name: str
    grade: int
