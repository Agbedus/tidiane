from fastapi import APIRouter
from sqlalchemy import select

from backend.database import async_session
from backend.models.book import Book

router = APIRouter()


@router.get("/api/books")
async def get_books():
    async with async_session() as session:
        result = await session.execute(
            select(Book).order_by(Book.sort_order, Book.id)
        )
        books = result.scalars().all()
        return {
            "books": [
                {
                    "id": b.id,
                    "title_en": b.title_en,
                    "title_fr": b.title_fr,
                    "teaser_en": b.teaser_en,
                    "teaser_fr": b.teaser_fr,
                    "description_en": b.description_en,
                    "description_fr": b.description_fr,
                    "status": b.status,
                    "cover_image": b.cover_image_url or "",
                    "cover_image_fr": b.cover_image_fr_url or "",
                    "sort_order": b.sort_order,
                }
                for b in books
            ]
        }
