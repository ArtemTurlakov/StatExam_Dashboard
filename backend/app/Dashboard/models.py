from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.core.models import Base


class StudentsModel(Base):
    __tablename__ = "students"
    id: Mapped[str] = mapped_column(primary_key=True)
    base_code: Mapped[str]
    school_id: Mapped[int] = mapped_column(ForeignKey("schools.code"))
    category_id: Mapped[int] = mapped_column(ForeignKey("student_categories.id"))
    is_ovz: Mapped[bool]
    sex: Mapped[bool]

class StudentCategoryModel(Base):
    __tablename__ = "student_categories"
    id: Mapped[str] = mapped_column(primary_key=True)
    description: Mapped[str]

class SchoolsModel(Base):
    __tablename__ = "schools"
    code: Mapped[int] = mapped_column(primary_key=True)
    kind_code: Mapped[int] = mapped_column(ForeignKey("school_kinds.code"))
    area_id: Mapped[int] = mapped_column(ForeignKey("areas.code"))

class SchoolKindsModel(Base):
    __tablename__ = "school_kinds"
    code: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

class AreasModel(Base):
    __tablename__ = "areas"
    code: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

class ExamStudent(Base):
    __tablename__ = "exam_results"
    id: Mapped[str] = mapped_column(primary_key=True)
    base_code: Mapped[str]
    first_points: Mapped[int]
    final_points: Mapped[int]
    completion_percents: Mapped[int]
    score: Mapped[int]
    student_id: Mapped[str] = mapped_column(ForeignKey("students.id"))
    schema_id: Mapped[int] = mapped_column(ForeignKey("test_schemes.id"))
    status_id: Mapped[int]
