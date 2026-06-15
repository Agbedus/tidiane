from app.models import Event, Book, Photo, db
from datetime import datetime, timezone
from typing import Sequence


def get_upcoming_events() -> Sequence[Event]:
    return Event.query.order_by(Event.date.desc()).all()


def get_all_books() -> Sequence[Book]:
    return Book.query.order_by(Book.created_at.desc()).all()


def get_all_photos() -> Sequence[Photo]:
    return Photo.query.order_by(Photo.created_at.desc()).all()


def create_event(
    title: str,
    date: datetime | None = None,
    display_date: str | None = None,
    day: str | None = None,
    month_year: str | None = None,
    location: str | None = None,
    description: str | None = None,
) -> Event:
    event = Event(
        title=title,
        date=date or datetime.now(timezone.utc),
        display_date=display_date,
        day=day,
        month_year=month_year,
        location=location,
        description=description,
    )
    db.session.add(event)
    db.session.commit()
    return event


def create_book(
    title: str,
    subtitle: str | None = None,
    author: str = 'Dr. Tidiane Ouattara',
    status: str | None = None,
    description: str | None = None,
    publisher_info: str | None = None,
    buy_link: str | None = None,
    cover_image_class: str | None = None,
    is_authored: bool = True,
) -> Book:
    book = Book(
        title=title,
        subtitle=subtitle,
        author=author,
        status=status,
        description=description,
        publisher_info=publisher_info,
        buy_link=buy_link,
        cover_image_class=cover_image_class,
        is_authored=is_authored,
    )
    db.session.add(book)
    db.session.commit()
    return book


def create_photo(
    image_path: str,
    title: str | None = None,
    caption: str | None = None,
    is_featured: bool = False,
    span_two: bool = False,
) -> Photo:
    photo = Photo(
        image_path=image_path,
        title=title,
        caption=caption,
        is_featured=is_featured,
        span_two=span_two,
    )
    db.session.add(photo)
    db.session.commit()
    return photo
