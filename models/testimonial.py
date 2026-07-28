from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from database import Base


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
    image_url = Column(String(1000), nullable=True)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.name_en} — {self.role_en}"
