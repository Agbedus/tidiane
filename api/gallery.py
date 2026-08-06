import logging

from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlalchemy import select

from database import dual_db
from models.gallery import GalleryPhoto
from utils.cloudinary import upload_to_cloudinary

logger = logging.getLogger("tidianeblog")
router = APIRouter()


@router.get("/api/gallery")
async def get_gallery():
    async with dual_db.get_read_session() as session:
        result = await session.execute(
            select(GalleryPhoto).order_by(GalleryPhoto.sort_order, GalleryPhoto.id)
        )
        photos = result.scalars().all()
        return {
            "photos": [
                {
                    "id": p.id,
                    "src": p.image_url or "",
                    "caption": p.caption,
                    "position": p.position,
                    "span": p.span,
                    "sort_order": p.sort_order,
                }
                for p in photos
            ]
        }


@router.post("/api/gallery/upload")
async def upload_gallery_image(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    url = await upload_to_cloudinary(file, folder="tidiane/gallery")
    logger.info("Uploaded gallery image: %s", url)
    return {"url": url, "filename": file.filename}
