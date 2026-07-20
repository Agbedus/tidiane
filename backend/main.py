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
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("tidianeblog")

# ── Paths ────────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
IMAGES_DIR = ROOT / "assets" / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
storage = FileSystemStorage(path=str(IMAGES_DIR))

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
    image_path = Column(ImageType(storage=storage), nullable=False)
    caption = Column(String(500), nullable=False, default="")
    position = Column(String(100), nullable=False, default="center")
    span = Column(Integer, nullable=False, default=1)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.caption} ({self.image_path})"


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, autoincrement=True)
    quote_en = Column(Text, nullable=False)
    quote_fr = Column(Text, nullable=False)
    name_en = Column(String(255), nullable=False)
    name_fr = Column(String(255), nullable=False)
    role_en = Column(String(255), nullable=False, default="")
    role_fr = Column(String(255), nullable=False, default="")
    initials = Column(String(10), nullable=False, default="")
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.name_en} — {self.role_en}"


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title_en = Column(String(500), nullable=False)
    title_fr = Column(String(500), nullable=False)
    description_en = Column(Text, nullable=False, default="")
    description_fr = Column(Text, nullable=False, default="")
    status = Column(String(100), nullable=False, default="Online Publication")
    cover_image = Column(ImageType(storage=storage), nullable=True)
    cover_image_fr = Column(ImageType(storage=storage), nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.title_en}"


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


class TestimonialAdmin(ModelView, model=Testimonial):
    column_list = [Testimonial.id, Testimonial.name_en, Testimonial.role_en, Testimonial.sort_order]
    column_searchable_list = [Testimonial.name_en, Testimonial.name_fr, Testimonial.role_en]
    column_sortable_list = [Testimonial.id, Testimonial.sort_order]
    name = "Testimonial"
    name_plural = "Testimonials"
    icon = "fa-solid fa-quote-right"
    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    column_default_sort = (Testimonial.sort_order, False)


class BookAdmin(ModelView, model=Book):
    column_list = [Book.id, Book.title_en, Book.title_fr, Book.cover_image, Book.cover_image_fr, Book.sort_order]
    column_searchable_list = [Book.title_en, Book.title_fr]
    column_sortable_list = [Book.id, Book.sort_order]
    name = "Book"
    name_plural = "Books"
    icon = "fa-solid fa-book"
    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    column_default_sort = (Book.sort_order, False)


admin = Admin(app, engine, title="Tidiane Admin", authentication_backend=None, templates_dir=str(ROOT / "backend" / "templates"))
admin.add_view(ContactMessageAdmin)
admin.add_view(GalleryPhotoAdmin)
admin.add_view(TestimonialAdmin)
admin.add_view(BookAdmin)


# ── Startup ──────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database initialized.")

    # Seed testimonials from testimonials.json if table is empty
    async with async_session() as session:
        result = await session.execute(select(Testimonial))
        if not result.scalars().first():
            testimonials_file = DATA_DIR / "testimonials.json"
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

    # Seed books from books.json if table is empty
    async with async_session() as session:
        result = await session.execute(select(Book))
        if not result.scalars().first():
            books_file = DATA_DIR / "books.json"
            if books_file.exists():
                data = json.loads(books_file.read_text(encoding="utf-8"))
                for i, b in enumerate(data.get("books", [])):
                    cover = b.get("cover_image", "")
                    cover_fr = b.get("cover_image_fr", "")
                    session.add(Book(
                        title_en=b.get("title_en", ""),
                        title_fr=b.get("title_fr", ""),
                        description_en=b.get("description_en", ""),
                        description_fr=b.get("description_fr", ""),
                        status=b.get("status", "Online Publication"),
                        cover_image=str(ROOT / cover) if cover else None,
                        cover_image_fr=str(ROOT / cover_fr) if cover_fr else None,
                        sort_order=i,
                    ))
                await session.commit()
                logger.info("Seeded %d books from books.json", len(data.get("books", [])))


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

        def to_relative(path: str) -> str:
            if not path:
                return ""
            p = Path(path)
            try:
                return str(p.relative_to(ROOT)).replace("\\", "/")
            except ValueError:
                if "assets/images" in path:
                    idx = path.index("assets/images")
                    return path[idx:].replace("\\", "/")
                return path.replace("\\", "/")

        return {
            "photos": [
                {
                    "id": p.id,
                    "src": to_relative(str(p.image_path)),
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


@app.get("/api/testimonials")
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
                    "sort_order": t.sort_order,
                }
                for t in items
            ]
        }


@app.get("/api/books")
async def get_books():
    async with async_session() as session:
        result = await session.execute(
            select(Book).order_by(Book.sort_order, Book.id)
        )
        books = result.scalars().all()

        def to_relative(path: str) -> str:
            if not path:
                return ""
            p = Path(path)
            try:
                return str(p.relative_to(ROOT)).replace("\\", "/")
            except ValueError:
                if "assets/images" in path:
                    idx = path.index("assets/images")
                    return path[idx:].replace("\\", "/")
                return path.replace("\\", "/")

        return {
            "books": [
                {
                    "id": b.id,
                    "title_en": b.title_en,
                    "title_fr": b.title_fr,
                    "description_en": b.description_en,
                    "description_fr": b.description_fr,
                    "status": b.status,
                    "cover_image": to_relative(str(b.cover_image)) if b.cover_image else "",
                    "cover_image_fr": to_relative(str(b.cover_image_fr)) if b.cover_image_fr else "",
                    "sort_order": b.sort_order,
                }
                for b in books
            ]
        }


# ── Static files and fallback to index.html ──────────────────────────
if (ROOT / "assets").exists():
    app.mount("/assets", StaticFiles(directory=str(ROOT / "assets")), name="assets")

if (ROOT / "partials").exists():
    app.mount("/partials", StaticFiles(directory=str(ROOT / "partials")), name="partials")


@app.middleware("http")
async def spa_fallback(request: Request, call_next):
    response = await call_next(request)
    path = request.url.path
    if response.status_code == 404 and request.method == "GET":
        if path.startswith("/admin") or path.startswith("/api") or path.startswith("/assets") or path.startswith("/partials"):
            return response
        file_path = ROOT / path.lstrip("/")
        if file_path.is_file():
            return FileResponse(str(file_path))
        index_path = ROOT / "index.html"
        if index_path.exists():
            return HTMLResponse(content=index_path.read_bytes(), status_code=200)
    return response
