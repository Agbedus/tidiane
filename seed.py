import json
import logging

from sqlalchemy import select, text

from database import engine, async_session, Base
from config import settings
from models.testimonial import Testimonial
from models.book import Book
from models.gallery import GalleryPhoto

logger = logging.getLogger("tidianeblog")


async def run_migrations():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        for col in ["teaser_en", "teaser_fr"]:
            await conn.execute(
                text(f"ALTER TABLE books ADD COLUMN IF NOT EXISTS {col} TEXT NOT NULL DEFAULT ''")
            )
    logger.info("Database initialized.")


async def seed_testimonials():
    async with async_session() as session:
        result = await session.execute(select(Testimonial))
        if not result.scalars().first():
            testimonials_file = settings.DATA_DIR / "testimonials.json"
            if testimonials_file.exists():
                data = json.loads(testimonials_file.read_text(encoding="utf-8"))
                for i, t in enumerate(data.get("testimonials", [])):
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
                logger.info("Seeded %d testimonials from testimonials.json", len(data.get("testimonials", [])))


async def seed_books():
    async with async_session() as session:
        result = await session.execute(select(Book))
        if not result.scalars().first():
            books_file = settings.DATA_DIR / "books.json"
            if books_file.exists():
                data = json.loads(books_file.read_text(encoding="utf-8"))
                for i, b in enumerate(data.get("books", [])):
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
                logger.info("Seeded %d books from books.json", len(data.get("books", [])))


async def seed_gallery():
    async with async_session() as session:
        result = await session.execute(select(GalleryPhoto))
        if not result.scalars().first():
            gallery_file = settings.DATA_DIR / "gallery.json"
            if gallery_file.exists():
                data = json.loads(gallery_file.read_text(encoding="utf-8"))
                for i, p in enumerate(data.get("photos", [])):
                    session.add(GalleryPhoto(
                        image_url=p.get("src", ""),
                        caption=p.get("caption", ""),
                        position=p.get("position", "center"),
                        span=p.get("span", 1),
                        sort_order=i,
                    ))
                await session.commit()
                logger.info("Seeded %d gallery photos from gallery.json", len(data.get("photos", [])))


async def seed_all():
    await seed_testimonials()
    await seed_books()
    await seed_gallery()
