from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from backend.database import Base


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
