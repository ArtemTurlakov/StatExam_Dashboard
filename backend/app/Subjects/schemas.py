from pydantic import BaseModel, model_validator


class SubjectsDTO(BaseModel):
    subject_id: int
    name: str
    grade: int
    @model_validator(mode='after')
    def val_type(self):
        if self.subject_id == 2 and self.grade == 11:
            self.name += "(Профильная)"
        elif self.subject_id == 22:
            self.name += "(Базовая)"
        return self
