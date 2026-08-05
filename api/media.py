import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from config import settings

router = APIRouter()


@router.get("/api/media")
async def get_media():
    media_file = settings.DATA_DIR / "media.json"
    if not media_file.exists():
        raise HTTPException(status_code=404, detail="Media file not found")
    return JSONResponse(content=json.loads(media_file.read_text(encoding="utf-8")))
