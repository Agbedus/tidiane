import logging

from fastapi import APIRouter
from sqlalchemy import select

from database import async_session
from models.contact import ContactMessage
from schemas.contact import ContactForm, ContactResponse

logger = logging.getLogger("tidianeblog")
router = APIRouter()


@router.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Tidiane App API is running"}


@router.post("/api/contact", response_model=ContactResponse)
async def submit_contact(data: ContactForm):
    async with async_session() as session:
        record = ContactMessage(
            name=data.name,
            organisation=data.organisation,
            email=data.email,
            message=data.message,
        )
        session.add(record)
        await session.commit()
    logger.info("Contact form submission: name=%s, email=%s", data.name, data.email)
    return ContactResponse(success=True, detail="Your message has been received. Thank you!")


@router.get("/api/contacts")
async def list_contacts():
    async with async_session() as session:
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
