from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from backend.config import settings


if not settings.DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is required")

engine = create_async_engine(settings.async_database_url, echo=False, pool_pre_ping=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass
