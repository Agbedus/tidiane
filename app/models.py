from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()


class Event(db.Model):
    __tablename__ = 'events'

    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String(200), nullable=False, index=True)
    date: datetime = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    display_date: str | None = db.Column(db.String(50))
    day: str | None = db.Column(db.String(10))
    month_year: str | None = db.Column(db.String(50))
    location: str | None = db.Column(db.String(200))
    description: str | None = db.Column(db.Text)
    created_at: datetime = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self) -> str:
        return f'<Event {self.title}>'


class Book(db.Model):
    __tablename__ = 'books'

    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String(200), nullable=False, index=True)
    subtitle: str | None = db.Column(db.String(200))
    author: str = db.Column(db.String(100), default='Dr. Tidiane Ouattara')
    status: str | None = db.Column(db.String(50))
    description: str | None = db.Column(db.Text)
    publisher_info: str | None = db.Column(db.String(200))
    buy_link: str | None = db.Column(db.String(500))
    cover_image_class: str | None = db.Column(db.String(10))
    is_authored: bool = db.Column(db.Boolean, default=True)
    created_at: datetime = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), index=True)

    def __repr__(self) -> str:
        return f'<Book {self.title}>'


class Photo(db.Model):
    __tablename__ = 'photos'

    id: int = db.Column(db.Integer, primary_key=True)
    title: str | None = db.Column(db.String(200))
    image_path: str = db.Column(db.String(200), nullable=False)
    caption: str | None = db.Column(db.String(500))
    is_featured: bool = db.Column(db.Boolean, default=False)
    span_two: bool = db.Column(db.Boolean, default=False)
    created_at: datetime = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), index=True)

    def __repr__(self) -> str:
        return f'<Photo {self.image_path}>'
