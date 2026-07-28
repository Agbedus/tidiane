import cloudinary.uploader
from fastapi import UploadFile


async def upload_to_cloudinary(file: UploadFile, folder: str = "tidiane") -> str:
    contents = await file.read()
    result = cloudinary.uploader.upload(contents, folder=folder)
    return result["secure_url"]
