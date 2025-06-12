
class MyQuery:
    def __init__(self, name: str, query, session, dtomodel=None):
        self.name = name
        self.query = query
        self.dtomodel = dtomodel
        self.session = session

    async def exec_with_model(self) -> dict:
        result = await self.session.execute(self.query)
        result_orm = result.all()
        if self.dtomodel:
            res = [self.dtomodel
                      .model_validate(row, from_attributes=True)
                      for row in result_orm]
        else:
            res = result_orm
        component = {f"{self.name}": res}
        return component

    async def exec(self) -> dict:
        result = await self.session.execute(self.query)
        result_orm = result.scalars().all()
        component = {f'{self.name}': result_orm[0]}
        return component