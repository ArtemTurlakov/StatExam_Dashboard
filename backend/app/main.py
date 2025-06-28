import fastapi
import uvicorn
from fastapi import FastAPI, HTTPException, security
from fastapi.middleware.cors import CORSMiddleware

from app.Authentification import get_user_by_username, create_user, authenticate_user, create_token, get_current_user
from app.core.database import SessionDep
from app.core.schemas import UserCreate, User
from .Dashboard.router import router as dashboard_router
from .Subjects.router import router as subjects_router
from .Dashboard.Marks.router import router as marks_router
from .Dashboard.Report.router import router as report_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/",
         tags=["Главный endpoint"],
         )
def root():
    return "hello"

@app.post('/create_user')
async def create(user: UserCreate, session: SessionDep):
    db_user = await get_user_by_username(user.username, session)
    print(db_user)
    if db_user:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    return await create_user(user, session)

@app.post("/token")
async def generate_token(session: SessionDep, form_data: security.OAuth2PasswordRequestForm = fastapi.Depends(), ):
    user = await authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(status_code=401, detail="Неверное имя пользователя или пароль")

    return await create_token(user)

@app.post("/user", response_model=User)
async def get_user(user: User = fastapi.Depends(get_current_user)):
    return user


app.include_router(router=subjects_router)
app.include_router(router=dashboard_router)
app.include_router(router=marks_router)
app.include_router(router=report_router)


if __name__=="__main__":
    uvicorn.run("app.main:app", reload=True)


