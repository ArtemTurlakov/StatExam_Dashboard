from fastapi import APIRouter
from sqlalchemy import select, func
from sqlalchemy.orm import aliased

from app.Dashboard.Marks.schemas import MarksDiagDTO, FinalsDiagDTO
from app.core.MyQuery import MyQuery
from app.core.database import SessionDep
from app.core.models import TestSchemasModel
from app.Dashboard.models import (StudentsModel, ExamStudent, StudentCategoryModel,
                                  SchoolsModel, SchoolKindsModel, AreasModel)

import pandas as pd
router = APIRouter(prefix="/marks", tags=["Для оценок"])

t = aliased(TestSchemasModel)
st = aliased(StudentsModel)
e = aliased(ExamStudent)
sc = aliased(StudentCategoryModel)
school = aliased(SchoolsModel)
sk = aliased(SchoolKindsModel)
a = aliased(AreasModel)

async def get_finals(schema, session: SessionDep):
    query = (select(e.final_points, func.count())
             .where(e.schema_id == schema.id)
             .group_by(e.final_points)
             .order_by(e.final_points))
    res = await MyQuery('finals_diag', query, session, FinalsDiagDTO).exec_with_model()
    return res

async def get_marks(schema, session: SessionDep):
    query = (select(e.score, func.count())
             .where(e.schema_id == schema.id)
             .group_by(e.score)
             .order_by(e.score))
    res = await MyQuery('finals_diag', query, session, MarksDiagDTO).exec_with_model()
    return res


async def get_marks_dynamic(schema, session: SessionDep):
    query = (select(e.score, func.count())
            .select_from(e)
             .where( e.schema_id == schema.id)
             .group_by(e.score)
             .order_by(e.score))
    res = await MyQuery('dynamic', query, session).exec_with_model()
    df = pd.DataFrame(res["dynamic"], columns=['score', 'count'])

    df = df.groupby(['score'], observed=True).agg({'sum'}).T

    data_dict = dict()
    for col in df.columns:
        data_dict[col] = df[col].values.tolist()[0]
    return {"dynamic": data_dict}


async def get_finals_dynamic(schema, session: SessionDep):
    query = (select(e.final_points, func.count())
            .select_from(e)
             .where(e.schema_id == schema.id)
             .group_by(e.final_points)
             .order_by(e.final_points))
    res = await MyQuery('dynamic', query, session).exec_with_model()
    df = pd.DataFrame(res["dynamic"], columns=['final_points', 'count'])
    s = df['count'].sum()
    if s <= 0: return dict()
    fin = (df['count'] * df['final_points']).sum()
    avg_finals = round(fin / s, 2)

    bins = [-1, 40, 60, 80, 101]
    df.final_points = pd.cut(df.final_points, bins=bins, labels=['Ниже минимального',
                                                                 'От минимального до 60',
                                                                 'От 61 до 80', 'От 81 до 100'])
    df = df.groupby(['final_points'], observed=True).agg({'sum'}).T

    data_dict = dict()
    for col in df.columns:
        data_dict[col] = df[col].values.tolist()[0]
    data_dict['Средний балл'] = avg_finals
    return {"dynamic": data_dict}


async def get_marks_counts(scheme, session: SessionDep):
        data = []
        if scheme.grade == 11:
            diag = await get_finals(scheme, session)
            dyn = await get_finals_dynamic(scheme, session)
        else:
            diag = await get_marks(scheme, session)
            dyn = await get_marks_dynamic(scheme, session)
        temp = {}
        temp.update(diag)
        temp.update(dyn)
        data.append(temp)

        result = {'marks': data}
        return result