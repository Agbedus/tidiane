from app.models import Event, Book, Photo, db
from app.services import create_event, create_book, create_photo


class TestIndex:
    def test_get_index(self, client):
        resp = client.get('/')
        assert resp.status_code == 200


class TestContact:
    def test_valid_contact_post(self, client):
        resp = client.post('/contact', data={
            'name': 'John Doe',
            'email': 'john@example.com',
            'message': 'Hello, I would like to get in touch.',
        })
        assert resp.status_code == 302

    def test_contact_missing_name(self, client):
        resp = client.post('/contact', data={
            'email': 'john@example.com',
            'message': 'Hello',
        })
        assert resp.status_code == 302

    def test_contact_invalid_email(self, client):
        resp = client.post('/contact', data={
            'name': 'John',
            'email': 'not-an-email',
            'message': 'Hello there!',
        })
        assert resp.status_code == 302


class TestAPI:
    def test_api_events_empty(self, client, app):
        resp = client.get('/api/events')
        assert resp.status_code == 200
        assert resp.json == []

    def test_api_events_with_data(self, client, app):
        with app.app_context():
            create_event(title='Test Event', location='Paris')
        resp = client.get('/api/events')
        assert resp.status_code == 200
        assert len(resp.json) == 1
        assert resp.json[0]['title'] == 'Test Event'

    def test_api_books_empty(self, client):
        resp = client.get('/api/books')
        assert resp.status_code == 200
        assert resp.json == []

    def test_api_books_with_data(self, client, app):
        with app.app_context():
            create_book(title='Test Book')
        resp = client.get('/api/books')
        assert resp.status_code == 200
        assert len(resp.json) == 1
        assert resp.json[0]['title'] == 'Test Book'

    def test_api_photos_empty(self, client):
        resp = client.get('/api/photos')
        assert resp.status_code == 200
        assert resp.json == []

    def test_api_photos_with_data(self, client, app):
        with app.app_context():
            create_photo(image_path='/img/test.jpg', title='Test Photo')
        resp = client.get('/api/photos')
        assert resp.status_code == 200
        assert len(resp.json) == 1
        assert resp.json[0]['title'] == 'Test Photo'


class TestAdminAuth:
    def test_login_page(self, client):
        resp = client.get('/auth/login')
        assert resp.status_code == 200

    def test_login_valid(self, client, app):
        resp = client.post('/auth/login', data={
            'username': 'admin',
            'password': 'changeme-on-first-deploy',
        })
        assert resp.status_code == 302

    def test_login_invalid(self, client):
        resp = client.post('/auth/login', data={
            'username': 'admin',
            'password': 'wrong-password',
        })
        assert resp.status_code == 200

    def test_logout_get_not_allowed(self, client):
        resp = client.get('/auth/logout')
        assert resp.status_code == 405

    def test_logout_post(self, client):
        resp = client.post('/auth/logout')
        assert resp.status_code == 302


class TestErrorHandlers:
    def test_404(self, client):
        resp = client.get('/nonexistent')
        assert resp.status_code == 404
