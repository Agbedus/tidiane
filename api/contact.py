import logging

from fastapi import APIRouter
from sqlalchemy import select

from database import dual_db
from models.contact import ContactMessage
from schemas.contact import ContactForm, ContactResponse

logger = logging.getLogger("tidianeblog")
router = APIRouter()


@router.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "message": "Tidiane App API is running",
        "database": dual_db.active_label,
    }


@router.post("/api/contact", response_model=ContactResponse)
async def submit_contact(data: ContactForm):
    async with dual_db.get_write_sessions() as sessions:
        for session in sessions:
            record = ContactMessage(
                name=data.name,
                organisation=data.organisation,
                email=data.email,
                message=data.message,
            )
            session.add(record)
            try:
                await session.commit()
            except Exception as exc:
                await session.rollback()
                logger.error("Failed to write contact to a database: %s", exc)
    logger.info("Contact form submission: name=%s, email=%s", data.name, data.email)
    return ContactResponse(success=True, detail="Your message has been received. Thank you!")


@router.get("/api/contacts")
async def list_contacts():
    async with dual_db.get_read_session() as session:
        result = await session.execute(
            select(ContactMessage).order_by(ContactMessage.created_at.desc())
        )
        messages = result.scalars().all()
        return [
            {
                "id": m.id,
                "name": m.name,
                "organisation": m.organisation,
                "email": m.email,
                "message": m.message,
                "created_at": m.created_at.isoformat() if m.created_at else None,
            }
            for m in messages
        ]
