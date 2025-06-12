from fastapi import APIRouter
from sqlalchemy import select
from sqlalchemy.orm import aliased

from app.Subjects.models import SubjectsModel
from app.Subjects.schemas import SubjectsDTO
from app.core.MyQuery import MyQuery
from app.core.database import SessionDep
from app.core.models import TestSchemasModel

router = APIRouter(prefix="/subjects", tags=["Предметы"])

t = aliased(TestSchemasModel)
s = aliased(SubjectsModel)

@router.get("/", summary="Получить все предметы по классу 9/11")
async def get_subjects( session: SessionDep):
        query = (select(t.subject_id, s.name, t.grade)
                .join(s)
                .group_by(t.grade, t.subject_id, s.name))
        res = await MyQuery('subjects', query, session, SubjectsDTO).exec_with_model()
        res = res['subjects']
        return res
