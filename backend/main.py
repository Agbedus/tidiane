from __future__ import annotations

import json
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, field_validator
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine, select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqladmin import Admin, ModelView

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("tidianeblog")

# ── Paths ────────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"

# ── Database ────────────────────────────────────────────────────────
_DB_DIR = Path(os.getenv("DB_DIR", str(DATA_DIR)))
_DB_DIR.mkdir(parents=True, exist_ok=True)
_DB_PATH = _DB_DIR / "tidiane.db"
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite+aiosqlite:///{_DB_PATH}")
engine = create_async_engine(DATABASE_URL, echo=False)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    organisation = Column(String(255), nullable=True, default="")
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.name} ({self.email}) — {self.created_at:%Y-%m-%d}"


class GalleryPhoto(Base):
    __tablename__ = "gallery_photos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    image_path = Column(String(500), nullable=False)
    caption = Column(String(500), nullable=False, default="")
    position = Column(String(100), nullable=False, default="center")
    span = Column(Integer, nullable=False, default=1)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.caption} ({self.image_path})"


# ── App ──────────────────────────────────────────────────────────────
app = FastAPI(title="H.E. Dr. Tidiane Ouattara", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Admin ────────────────────────────────────────────────────────────
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "change-me-in-production")


class ContactMessageAdmin(ModelView, model=ContactMessage):
    column_list = [ContactMessage.id, ContactMessage.name, ContactMessage.email, ContactMessage.created_at]
    column_searchable_list = [ContactMessage.name, ContactMessage.email]
    column_sortable_list = [ContactMessage.id, ContactMessage.created_at]
    name = "Contact Message"
    name_plural = "Contact Messages"
    icon = "fa-solid fa-envelope"
    can_create = False
    can_edit = False
    can_delete = True
    can_export = True
    column_default_sort = (ContactMessage.created_at, True)


class GalleryPhotoAdmin(ModelView, model=GalleryPhoto):
    column_list = [GalleryPhoto.id, GalleryPhoto.caption, GalleryPhoto.image_path, GalleryPhoto.span, GalleryPhoto.sort_order]
    column_searchable_list = [GalleryPhoto.caption]
    column_sortable_list = [GalleryPhoto.id, GalleryPhoto.sort_order]
    name = "Gallery Photo"
    name_plural = "Gallery Photos"
    icon = "fa-solid fa-image"
    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    column_default_sort = (GalleryPhoto.sort_order, False)


admin = Admin(app, engine, title="Tidiane Admin", authentication_backend=None)
admin.add_view(ContactMessageAdmin)
admin.add_view(GalleryPhotoAdmin)


# ── Startup ──────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database initialized.")

    # Seed gallery from gallery.json if table is empty
    async with async_session() as session:
        result = await session.execute(select(GalleryPhoto))
        if not result.scalars().first():
            gallery_file = DATA_DIR / "gallery.json"
            if gallery_file.exists():
                data = json.loads(gallery_file.read_text(encoding="utf-8"))
                for i, photo in enumerate(data.get("photos", [])):
                    session.add(GalleryPhoto(
                        image_path=photo.get("src", ""),
                        caption=photo.get("caption", ""),
                        position=photo.get("position", "center"),
                        span=photo.get("span", 1),
                        sort_order=i,
                    ))
                await session.commit()
                logger.info("Seeded %d gallery photos from gallery.json", len(data.get("photos", [])))


# ── Models ───────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    organisation: str = ""
    email: EmailStr
    message: str

    @field_validator("name", "message")
    def check_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field must not be empty")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    detail: str


# ── Routes ───────────────────────────────────────────────────────────
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Tidiane App API is running"}


@app.post("/api/contact", response_model=ContactResponse)
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


@app.get("/api/contacts")
async def list_contacts():
    async with async_session() as session:
        result = await session.execute(select(ContactMessage).order_by(ContactMessage.created_at.desc()))
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


# ── Translations ─────────────────────────────────────────────────────


@app.get("/api/translations/{lang}")
async def get_translations(lang: str):
    if lang not in ("en", "fr"):
        raise HTTPException(status_code=400, detail="Language must be 'en' or 'fr'")
    translation_file = DATA_DIR / f"{lang}.json"
    if not translation_file.exists():
        raise HTTPException(status_code=404, detail=f"Translation file for '{lang}' not found")
    return JSONResponse(content=json.loads(translation_file.read_text(encoding="utf-8")))


@app.get("/api/gallery")
async def get_gallery():
    async with async_session() as session:
        result = await session.execute(
            select(GalleryPhoto).order_by(GalleryPhoto.sort_order, GalleryPhoto.id)
        )
        photos = result.scalars().all()
        return {
            "photos": [
                {
                    "id": p.id,
                    "src": p.image_path,
                    "caption": p.caption,
                    "position": p.position,
                    "span": p.span,
                    "sort_order": p.sort_order,
                }
                for p in photos
            ]
        }


@app.post("/api/gallery/upload")
async def upload_gallery_image(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    upload_dir = ROOT / "assets" / "images"
    upload_dir.mkdir(parents=True, exist_ok=True)
    filename = file.filename or "upload.jpg"
    dest = upload_dir / filename
    content = await file.read()
    dest.write_bytes(content)
    relative_path = f"assets/images/{filename}"
    logger.info("Uploaded gallery image: %s", relative_path)
    return {"path": relative_path, "filename": filename}


# ── Static files and fallback to index.html ──────────────────────────
if (ROOT / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(ROOT / "assets")), name="assets")

if (ROOT / "partials").exists():
    app.mount("/partials", StaticFiles(directory=str(ROOT / "partials")), name="partials")


@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    file_path = ROOT / full_path
    if file_path.is_file():
        return FileResponse(str(file_path))
    index_path = ROOT / "index.html"
    if index_path.exists():
        return HTMLResponse(content=index_path.read_bytes(), status_code=200)
    raise HTTPException(status_code=404, detail="Not found")
