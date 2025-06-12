import uuid
from datetime import datetime

from sqlalchemy import ForeignKey, Column, UUID
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase

import passlib.hash as _hash

class Base(DeclarativeBase):
    pass

class TestSchemasModel(Base):
    __tablename__ = "test_schemes"
    id: Mapped[int] = mapped_column(primary_key=True)
    exam_type_id: Mapped[int]
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.code"))
    exam_year: Mapped[int]
    grade: Mapped[int]

class User(Base):
    __tablename__ = "auth_user"
    id = Column(UUID(as_uuid=False),primary_key=True,  default=uuid.uuid4)
    password: Mapped[str]
    username: Mapped[str]
    is_superuser: Mapped[bool]
    first_name: Mapped[str]
    last_name: Mapped[str]
    email: Mapped[str]
    is_activ: Mapped[bool]
    date_joined: Mapped[datetime]

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.password)
