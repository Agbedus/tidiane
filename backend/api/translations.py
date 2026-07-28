import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from backend.config import settings

router = APIRouter()


@router.get("/api/translations/{lang}")
async def get_translations(lang: str):
    if lang not in ("en", "fr"):
        raise HTTPException(status_code=400, detail="Language must be 'en' or 'fr'")
    translation_file = settings.DATA_DIR / f"{lang}.json"
    if not translation_file.exists():
        raise HTTPException(status_code=404, detail=f"Translation file for '{lang}' not found")
    return JSONResponse(content=json.loads(translation_file.read_text(encoding="utf-8")))
