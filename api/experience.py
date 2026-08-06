from fastapi import APIRouter
from sqlalchemy import select

from database import dual_db
from models.experience import Experience

router = APIRouter()


@router.get("/api/experience")
async def get_experience():
    async with dual_db.get_read_session() as session:
        result = await session.execute(
            select(Experience).order_by(Experience.sort_order, Experience.id)
        )
        items = result.scalars().all()
        return {
            "experience": [
                {
                    "id": e.id,
                    "year": e.year,
                    "role_en": e.role_en,
                    "role_fr": e.role_fr,
                    "org_en": e.org_en,
                    "org_fr": e.org_fr,
                    "description_en": e.description_en,
                    "description_fr": e.description_fr,
                    "achievements_en": e.achievements_en,
                    "achievements_fr": e.achievements_fr,
                    "show_on_timeline": e.show_on_timeline,
                    "sort_order": e.sort_order,
                }
                for e in items
            ]
        }
