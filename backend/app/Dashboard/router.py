from fastapi import APIRouter
from sqlalchemy import select, func, desc, and_, cast, Boolean, distinct
from sqlalchemy.orm import aliased

from ..core.MyQuery import MyQuery
from ..core.database import SessionDep
from ..core.models import TestSchemasModel
from .Marks.router import get_marks_counts
from .models import StudentsModel, ExamStudent, StudentCategoryModel, SchoolsModel, SchoolKindsModel, AreasModel
from .schemas import StudentCategoriesDTO, OOCountsDTO, AreaCountsDTO, StudentsSexCountsDTO, SchemaDTO

router = APIRouter(prefix="/dashboard", tags=["Для дашборда"])

CACHE = {}

t = aliased(TestSchemasModel)
st = aliased(StudentsModel)
e = aliased(ExamStudent)
sc = aliased(StudentCategoryModel)
school = aliased(SchoolsModel)
sk = aliased(SchoolKindsModel)
a = aliased(AreasModel)

@router.get("/{grade, year}/students_count_all",
            summary=
            "Получить общее количество"
            " студентов на экзамене за"
            " конкретный год")

async def get_stud_count_all( grade: int, year: str, session: SessionDep):
        query = (select(func.count())
                .select_from(st)
                .where(cast(st.base_code == f'{year}-{grade}', Boolean)))
        res = await MyQuery('students_at_all', query, session).exec()
        return res


@router.get("/{grade, subject}/schemas", summary="Получить все схемы из бд")

async def get_schemas(grade: int, subject: int, session: SessionDep):
        query = (select( t.id, t.exam_year, t.grade)
                .select_from(t)
                .where(and_(t.grade == grade,
                        t.subject_id == subject)))
        res = await  MyQuery('schemas', query, session, SchemaDTO).exec_with_model()
        res = res['schemas']
        return res


async def get_sex_count(schemaid, session: SessionDep):
        query = (select(st.sex, func.count(distinct(e.student_id)))
                 .select_from(e)
                 .join(st)
                 .where(e.schema_id == schemaid)
                 .group_by(st.sex)
                 .order_by(desc(func.count())))
        res = await MyQuery('sextable', query, session, StudentsSexCountsDTO).exec_with_model()
        return res


async def get_on_exam_count(schemaid, session: SessionDep):
        query = (select(func.count(distinct(e.student_id)))
                 .select_from(e)
                 .join(st)
                 .where(e.schema_id == schemaid))
        res = await MyQuery('count_on_exam', query, session).exec()
        return res


async def get_categories_count(schemaid, session: SessionDep):
    query = (select(sc.description, func.count(distinct(e.student_id)))
             .select_from(e)
             .join(st)
             .where(e.schema_id == schemaid)
             .join(sc)
             .group_by(sc.description)).order_by(desc(func.count()))

    res = await MyQuery('categories', query, session,
                        StudentCategoriesDTO).exec_with_model()
    return res


async def get_oo_counts(schemaid, session: SessionDep):
        query = (select(sk.name, func.count(distinct(e.student_id)))
                 .select_from(e)
                 .join(st)
                 .where(e.schema_id == schemaid)
                 .join(school)
                 .join(sk)
                 .group_by(sk.name)).order_by(desc(func.count()))

        res = await MyQuery('OO', query,
                            session, OOCountsDTO).exec_with_model()
        return res


async def get_areas_counts(schemaid, session: SessionDep):
        query = (select(a.name, func.count(distinct(e.student_id)))
                 .select_from(e)
                 .join(st)
                 .where(e.schema_id == schemaid)
                 .join(school)
                 .join(a)
                 .group_by(a.name)).order_by(desc(func.count()))

        res = await MyQuery('areas', query,
                            session, AreaCountsDTO).exec_with_model()
        return res


@router.get("/{grade, subject}", summary="Все данные",)
async def get_counts(grade: int, subject: int, session: SessionDep):
    res = CACHE.get(f'{grade}-{subject}', 0)
    if not res:
        res = await dashboard_counts(grade, subject, session)
        CACHE[f'{grade}-{subject}'] = res
    return {f'{grade}-{subject}': res}


async def dashboard_counts(grade: int, subject: int, session: SessionDep):
    data = []
    schemas = await get_schemas(grade, subject, session)
    for schema in schemas:
        year = {'year': schema.exam_year}
        stud_c_all = await get_stud_count_all(grade, schema.exam_year, session)
        if stud_c_all['students_at_all'] > 0:
                year.update(stud_c_all)
        else: break
        year.update( await get_on_exam_count(schema.id, session))
        year.update( await get_sex_count(schema.id, session))
        year.update( await get_categories_count(schema.id, session))
        year.update( await get_oo_counts(schema.id, session))
        year.update( await get_areas_counts(schema.id, session))
        year.update( await  get_marks_counts(schema, session))

        data.append(year)
    return data
