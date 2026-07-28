from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title_en = Column(String(500), nullable=False)
    title_fr = Column(String(500), nullable=False)
    teaser_en = Column(Text, nullable=False, default="")
    teaser_fr = Column(Text, nullable=False, default="")
    description_en = Column(Text, nullable=False, default="")
    description_fr = Column(Text, nullable=False, default="")
    status = Column(String(100), nullable=False, default="Online Publication")
    cover_image_url = Column(String(1000), nullable=True)
    cover_image_fr_url = Column(String(1000), nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.title_en}"
