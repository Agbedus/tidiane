import json
import logging

from sqlalchemy import select, text

from database import dual_db, Base
from config import settings
from models.testimonial import Testimonial
from models.book import Book
from models.gallery import GalleryPhoto
from models.experience import Experience

logger = logging.getLogger("tidianeblog")

_MIGRATION_COLUMNS = {
    "books": ["teaser_en", "teaser_fr"],
}


async def _run_migrations_on_engine(engine, label: str):
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
            for table, cols in _MIGRATION_COLUMNS.items():
                for col in cols:
                    await conn.execute(
                        text(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {col} TEXT NOT NULL DEFAULT ''")
                    )
        logger.info("Migrations completed on %s", label)
    except Exception as exc:
        logger.error("Migrations failed on %s: %s", label, exc)


async def run_migrations():
    if dual_db.pg_engine:
        await _run_migrations_on_engine(dual_db.pg_engine, "PostgreSQL")
    if dual_db.mysql_engine:
        await _run_migrations_on_engine(dual_db.mysql_engine, "MySQL")


async def seed_testimonials():
    async with dual_db.get_read_session() as session:
        result = await session.execute(select(Testimonial))
        if result.scalars().first():
            return

    testimonials_file = settings.DATA_DIR / "testimonials.json"
    if not testimonials_file.exists():
        return

    data = json.loads(testimonials_file.read_text(encoding="utf-8"))
    items = data.get("testimonials", [])

    async with dual_db.get_write_sessions() as sessions:
        for session in sessions:
            existing = await session.execute(select(Testimonial))
            if existing.scalars().first():
                continue
            for i, t in enumerate(items):
                session.add(Testimonial(
                    quote_en=t.get("quote_en", ""),
                    quote_fr=t.get("quote_fr", ""),
                    name_en=t.get("name_en", ""),
                    name_fr=t.get("name_fr", ""),
                    role_en=t.get("role_en", ""),
                    role_fr=t.get("role_fr", ""),
                    initials=t.get("initials", ""),
                    sort_order=i,
                ))
            await session.commit()
    logger.info("Seeded %d testimonials", len(items))


async def seed_books():
    async with dual_db.get_read_session() as session:
        result = await session.execute(select(Book))
        if result.scalars().first():
            return

    books_file = settings.DATA_DIR / "books.json"
    if not books_file.exists():
        return

    data = json.loads(books_file.read_text(encoding="utf-8"))
    items = data.get("books", [])

    async with dual_db.get_write_sessions() as sessions:
        for session in sessions:
            existing = await session.execute(select(Book))
            if existing.scalars().first():
                continue
            for i, b in enumerate(items):
                cover = b.get("cover_image", "")
                cover_fr = b.get("cover_image_fr", "")
                session.add(Book(
                    title_en=b.get("title_en", ""),
                    title_fr=b.get("title_fr", ""),
                    teaser_en=b.get("teaser_en", ""),
                    teaser_fr=b.get("teaser_fr", ""),
                    description_en=b.get("description_en", ""),
                    description_fr=b.get("description_fr", ""),
                    status=b.get("status", "Online Publication"),
                    cover_image_url=cover if cover else None,
                    cover_image_fr_url=cover_fr if cover_fr else None,
                    sort_order=i,
                ))
            await session.commit()
    logger.info("Seeded %d books", len(items))


async def seed_gallery():
    async with dual_db.get_read_session() as session:
        result = await session.execute(select(GalleryPhoto))
        if result.scalars().first():
            return

    gallery_file = settings.DATA_DIR / "gallery.json"
    if not gallery_file.exists():
        return

    data = json.loads(gallery_file.read_text(encoding="utf-8"))
    items = data.get("photos", [])

    async with dual_db.get_write_sessions() as sessions:
        for session in sessions:
            existing = await session.execute(select(GalleryPhoto))
            if existing.scalars().first():
                continue
            for i, p in enumerate(items):
                session.add(GalleryPhoto(
                    image_url=p.get("src", ""),
                    caption=p.get("caption", ""),
                    position=p.get("position", "center"),
                    span=p.get("span", 1),
                    sort_order=i,
                ))
            await session.commit()
    logger.info("Seeded %d gallery photos", len(items))


async def seed_experiences():
    async with dual_db.get_read_session() as session:
        result = await session.execute(select(Experience))
        if result.scalars().first():
            return

    exp_file = settings.DATA_DIR / "experience.json"
    if not exp_file.exists():
        return

    data = json.loads(exp_file.read_text(encoding="utf-8"))
    items = data.get("experience", [])

    async with dual_db.get_write_sessions() as sessions:
        for session in sessions:
            existing = await session.execute(select(Experience))
            if existing.scalars().first():
                continue
            for i, e in enumerate(items):
                session.add(Experience(
                    year=e.get("year", ""),
                    role_en=e.get("role_en", ""),
                    role_fr=e.get("role_fr", ""),
                    org_en=e.get("org_en", ""),
                    org_fr=e.get("org_fr", ""),
                    description_en=e.get("description_en", ""),
                    description_fr=e.get("description_fr", ""),
                    achievements_en=e.get("achievements_en", ""),
                    achievements_fr=e.get("achievements_fr", ""),
                    show_on_timeline=e.get("show_on_timeline", False),
                    sort_order=i,
                ))
            await session.commit()
    logger.info("Seeded %d experiences", len(items))


async def seed_all():
    await seed_testimonials()
    await seed_books()
    await seed_gallery()
    await seed_experiences()
