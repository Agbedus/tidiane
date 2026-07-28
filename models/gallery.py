from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from database import Base


class GalleryPhoto(Base):
    __tablename__ = "gallery_photos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    image_url = Column(String(1000), nullable=False)
    caption = Column(String(500), nullable=False, default="")
    position = Column(String(100), nullable=False, default="center")
    span = Column(Integer, nullable=False, default=1)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.caption} ({self.image_url})"
