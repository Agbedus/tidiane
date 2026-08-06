import logging
import time
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from config import settings

logger = logging.getLogger("tidianeblog")


class Base(DeclarativeBase):
    pass


class DualDatabaseManager:
    def __init__(self):
        self.pg_engine = None
        self.mysql_engine = None
        self.pg_session_factory = None
        self.mysql_session_factory = None
        self._pg_healthy = False
        self._mysql_healthy = False
        self._last_check = 0.0
        self._check_interval = 30.0
        self._primary = settings.DATABASE_PRIMARY.lower()

    async def initialize(self):
        if settings.async_database_url:
            try:
                self.pg_engine = create_async_engine(
                    settings.async_database_url, echo=False, pool_pre_ping=True
                )
                self.pg_session_factory = sessionmaker(
                    self.pg_engine, class_=AsyncSession, expire_on_commit=False
                )
            except Exception as exc:
                logger.error("Failed to create PostgreSQL engine: %s", exc)

        if settings.async_mysql_url:
            try:
                self.mysql_engine = create_async_engine(
                    settings.async_mysql_url, echo=False, pool_pre_ping=True
                )
                self.mysql_session_factory = sessionmaker(
                    self.mysql_engine, class_=AsyncSession, expire_on_commit=False
                )
            except Exception as exc:
                logger.error("Failed to create MySQL engine: %s", exc)

        await self.health_check()
        logger.info(
            "Dual DB init: PG=%s, MySQL=%s, primary=%s",
            self._pg_healthy,
            self._mysql_healthy,
            self.active_label,
        )

    async def health_check(self):
        now = time.monotonic()
        if now - self._last_check < self._check_interval:
            return
        self._last_check = now

        if self.pg_engine:
            try:
                async with self.pg_engine.connect() as conn:
                    await conn.execute(
                        __import__("sqlalchemy", fromlist=["text"]).text("SELECT 1")
                    )
                self._pg_healthy = True
            except Exception:
                self._pg_healthy = False
                logger.warning("PostgreSQL health check failed")

        if self.mysql_engine:
            try:
                async with self.mysql_engine.connect() as conn:
                    await conn.execute(
                        __import__("sqlalchemy", fromlist=["text"]).text("SELECT 1")
                    )
                self._mysql_healthy = True
            except Exception:
                self._mysql_healthy = False
                logger.warning("MySQL health check failed")

    @property
    def active_label(self) -> str:
        if self._primary == "postgresql":
            return "postgresql"
        if self._primary == "mysql":
            return "mysql"
        if self._pg_healthy:
            return "postgresql"
        if self._mysql_healthy:
            return "mysql"
        return "none"

    @property
    def active_engine(self):
        label = self.active_label
        if label == "postgresql":
            return self.pg_engine
        if label == "mysql":
            return self.mysql_engine
        return self.pg_engine or self.mysql_engine

    @asynccontextmanager
    async def get_read_session(self) -> AsyncGenerator[AsyncSession, None]:
        await self.health_check()

        if self._primary == "mysql" and self.mysql_session_factory:
            async with self.mysql_session_factory() as session:
                try:
                    yield session
                    return
                except Exception:
                    pass

        if self.pg_session_factory and (self._primary == "auto" or self._primary == "postgresql"):
            async with self.pg_session_factory() as session:
                try:
                    yield session
                    return
                except Exception:
                    if self._primary == "postgresql":
                        raise
                    logger.warning("PostgreSQL read failed, trying MySQL")

        if self.mysql_session_factory:
            async with self.mysql_session_factory() as session:
                yield session
                return

        raise RuntimeError("No database available for reads")

    @asynccontextmanager
    async def get_write_sessions(self) -> AsyncGenerator[list[AsyncSession], None]:
        await self.health_check()
        sessions: list[AsyncSession] = []
        exits = []

        for factory, label in [
            (self.pg_session_factory, "PostgreSQL"),
            (self.mysql_session_factory, "MySQL"),
        ]:
            if factory and self._is_healthy(label):
                try:
                    s = factory()
                    sessions.append(s)
                    exits.append((s, label))
                except Exception as exc:
                    logger.error("Failed to create %s write session: %s", label, exc)

        if not sessions:
            raise RuntimeError("No database available for writes")

        try:
            yield sessions
        finally:
            for s, label in exits:
                try:
                    await s.close()
                except Exception:
                    pass

    def _is_healthy(self, label: str) -> bool:
        if label == "PostgreSQL":
            return self._pg_healthy or self._primary == "postgresql"
        if label == "MySQL":
            return self._mysql_healthy or self._primary == "mysql"
        return False

    async def close(self):
        if self.pg_engine:
            await self.pg_engine.dispose()
        if self.mysql_engine:
            await self.mysql_engine.dispose()


dual_db = DualDatabaseManager()


async def get_read_session() -> AsyncGenerator[AsyncSession, None]:
    async with dual_db.get_read_session() as session:
        yield session


async def get_write_sessions() -> AsyncGenerator[list[AsyncSession], None]:
    async with dual_db.get_write_sessions() as sessions:
        yield sessions
