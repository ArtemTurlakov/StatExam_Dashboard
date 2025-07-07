from pydantic import BaseModel, field_validator


class StudOnExamDTO(BaseModel):
    first_points: int
    final_points: int
    completion_percents: int
    score: int
    schema_id: int
    status_id: int
    school_id: int
    category_id: int
    is_ovz: bool
    sex: bool

class StudentsSexCountsDTO(BaseModel):
    sex: bool|str
    count: int
    @field_validator("sex", mode='before')
    def translate(raw: bool) -> str:
        sex = "Женский" if raw else "Мужской"
        return sex

class StudentCategoriesDTO(BaseModel):
    description: str
    count: int

class OOCountsDTO(BaseModel):
    name: str
    count: int

class AreaCountsDTO(BaseModel):
    name: str
    count: int

class SchemaDTO(BaseModel):
    id: int
    exam_year: int
    grade: int
