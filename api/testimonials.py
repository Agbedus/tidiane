from fastapi import APIRouter
from sqlalchemy import select

from database import async_session
from models.testimonial import Testimonial

router = APIRouter()


@router.get("/api/testimonials")
async def get_testimonials():
    async with async_session() as session:
        result = await session.execute(
            select(Testimonial).order_by(Testimonial.sort_order, Testimonial.id)
        )
        items = result.scalars().all()
        return {
            "testimonials": [
                {
                    "id": t.id,
                    "quote_en": t.quote_en,
                    "quote_fr": t.quote_fr,
                    "name_en": t.name_en,
                    "name_fr": t.name_fr,
                    "role_en": t.role_en,
                    "role_fr": t.role_fr,
                    "initials": t.initials,
                    "image": t.image_url or "",
                    "sort_order": t.sort_order,
                }
                for t in items
            ]
        }
