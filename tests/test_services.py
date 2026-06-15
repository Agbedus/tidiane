from app.models import Event, Book, Photo
from app.services import create_event, create_book, create_photo, get_upcoming_events, get_all_books, get_all_photos


class TestEventService:
    def test_create_event(self, app):
        with app.app_context():
            event = create_event(
                title='Test Event',
                location='Paris',
                description='A test event',
            )
            assert event.id is not None
            assert event.title == 'Test Event'
            assert event.location == 'Paris'

    def test_get_events_empty(self, app):
        with app.app_context():
            events = get_upcoming_events()
            assert list(events) == []

    def test_get_events_with_data(self, app):
        with app.app_context():
            create_event(title='Event 1')
            create_event(title='Event 2')
            events = list(get_upcoming_events())
            assert len(events) == 2


class TestBookService:
    def test_create_book(self, app):
        with app.app_context():
            book = create_book(title='Test Book', author='Dr. Tidiane Ouattara')
            assert book.id is not None
            assert book.title == 'Test Book'

    def test_get_books(self, app):
        with app.app_context():
            create_book(title='Book A')
            books = list(get_all_books())
            assert len(books) == 1
            assert books[0].title == 'Book A'


class TestPhotoService:
    def test_create_photo(self, app):
        with app.app_context():
            photo = create_photo(image_path='/img/photo.jpg', title='Test Photo')
            assert photo.id is not None
            assert photo.image_path == '/img/photo.jpg'

    def test_get_photos(self, app):
        with app.app_context():
            create_photo(image_path='/img/p1.jpg')
            photos = list(get_all_photos())
            assert len(photos) == 1
