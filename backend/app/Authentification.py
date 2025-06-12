import datetime

import fastapi
import fastapi.security as security
from jose import jwt
from sqlalchemy import select

from app.core import models, schemas
from app.core.database import SessionDep
import passlib.hash as _hash

from app.core.schemas import User

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/token")

JWT_SECRET = "statexam-dashboard_secret"

async def get_user_by_username(username: str, session: SessionDep):
    result = await session.execute(select(models.User).where(models.User.username == username))
    return result.scalars().first()

async def create_user(user: schemas.UserCreate, session: SessionDep):
    _user = models.User(username=user.username, password=_hash.bcrypt.hash(user.password),
                        is_superuser=True, first_name='test', last_name='test',
                        email='test', is_activ=True, date_joined=datetime.date.today())
    session.add(_user)
    await session.commit()
    await session.refresh(_user)
    return _user

async def authenticate_user(username: str, password: str, session: SessionDep):
    user = await get_user_by_username(username, session)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user

async def create_token(user: models.User):
    _user = schemas.User.model_validate(user)

    token = jwt.encode(_user.model_dump(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")

async def get_current_user(session: SessionDep, token: str = fastapi.Depends(oauth2schema), ):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print("payload",payload)
        user = await session.execute(select(models.User).where(models.User.id == payload['id']))
    except:
        raise fastapi.HTTPException(status_code=401, detail="Неверное имя пользователя или пароль")

    return User.model_validate(user.scalars().first())