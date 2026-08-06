from __future__ import annotations

import os
from pathlib import Path

import cloudinary
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / ".env")


class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    MYSQL_URL: str = os.getenv("MYSQL_URL", "")
    DATABASE_PRIMARY: str = os.getenv("DATABASE_PRIMARY", "auto")

    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "change-me-in-production")
    SESSION_SECRET: str = os.getenv("SESSION_SECRET", "tidiane-admin-secret-change-me")

    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY", "")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET", "")

    SELF_PING_URL: str = os.getenv("SELF_PING_URL", "")
    SELF_PING_INTERVAL: int = int(os.getenv("SELF_PING_INTERVAL", "600"))

    ROOT: Path = ROOT
    DATA_DIR: Path = ROOT / "data"
    ASSETS_DIR: Path = ROOT / "assets"
    PARTIALS_DIR: Path = ROOT / "partials"
    TEMPLATES_DIR: Path = ROOT / "templates"

    @property
    def async_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    @property
    def async_mysql_url(self) -> str:
        url = self.MYSQL_URL
        if url.startswith("mysql://"):
            url = url.replace("mysql://", "mysql+aiomysql://", 1)
        return url


settings = Settings()


def configure_cloudinary():
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )
