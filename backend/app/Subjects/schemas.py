from pydantic import BaseModel


class SubjectsDTO(BaseModel):
    subject_id: int
    name: str
    grade: int
