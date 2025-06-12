from pydantic import BaseModel, Field


class MarksDiagDTO(BaseModel):
    score: int
    count: int

class FinalsDiagDTO(BaseModel):
    final_points: int
    count: int

