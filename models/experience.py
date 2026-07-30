from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from database import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, autoincrement=True)
    year = Column(String(100), nullable=False, default="")
    role_en = Column(String(500), nullable=False)
    role_fr = Column(String(500), nullable=False)
    org_en = Column(String(500), nullable=False)
    org_fr = Column(String(500), nullable=False)
    description_en = Column(Text, nullable=False, default="")
    description_fr = Column(Text, nullable=False, default="")
    achievements_en = Column(Text, nullable=False, default="")
    achievements_fr = Column(Text, nullable=False, default="")
    show_on_timeline = Column(Boolean, nullable=False, default=False)
    sort_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def __str__(self) -> str:
        return f"{self.role_en}"
