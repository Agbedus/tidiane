from __future__ import annotations

import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from sqladmin import Admin

from backend.config import settings, configure_cloudinary
from backend.database import engine
from backend.admin.auth import AdminAuth
from backend.admin.views import (
    ContactMessageAdmin,
    GalleryPhotoAdmin,
    TestimonialAdmin,
    BookAdmin,
)
from backend.api.contact import router as contact_router
from backend.api.gallery import router as gallery_router
from backend.api.testimonials import router as testimonials_router
from backend.api.books import router as books_router
from backend.api.translations import router as translations_router
from backend.seed import run_migrations, seed_all

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("tidianeblog")

configure_cloudinary()

app = FastAPI(title="H.E. Dr. Tidiane Ouattara", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

admin = Admin(
    app, engine,
    title="Tidiane Admin",
    authentication_backend=AdminAuth(),
    templates_dir=str(settings.TEMPLATES_DIR),
)
admin.add_view(ContactMessageAdmin)
admin.add_view(GalleryPhotoAdmin)
admin.add_view(TestimonialAdmin)
admin.add_view(BookAdmin)

app.include_router(contact_router)
app.include_router(gallery_router)
app.include_router(testimonials_router)
app.include_router(books_router)
app.include_router(translations_router)


@app.on_event("startup")
async def startup():
    await run_migrations()
    await seed_all()


if settings.ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(settings.ASSETS_DIR)), name="assets")

if settings.PARTIALS_DIR.exists():
    app.mount("/partials", StaticFiles(directory=str(settings.PARTIALS_DIR)), name="partials")


@app.middleware("http")
async def spa_fallback(request: Request, call_next):
    response = await call_next(request)
    if response.status_code == 404 and request.method == "GET":
        if request.url.path.startswith(("/admin", "/api", "/assets", "/partials")):
            return response
        file_path = settings.ROOT / request.url.path.lstrip("/")
        if file_path.is_file():
            return FileResponse(str(file_path))
        index_path = settings.ROOT / "index.html"
        if index_path.exists():
            return HTMLResponse(content=index_path.read_bytes(), status_code=200)
    return response
