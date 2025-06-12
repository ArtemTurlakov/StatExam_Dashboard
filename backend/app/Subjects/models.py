from sqlalchemy.orm import Mapped, mapped_column

from app.core.models import Base


class SubjectsModel(Base):
    __tablename__ = "subjects"
    code: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    grade: Mapped[int]
