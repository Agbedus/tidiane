from flask import Blueprint, render_template, flash, redirect, url_for, current_app, jsonify
from app.models import Event, Book, Photo
from app.forms import ContactForm
from app.extensions import mail, limiter
from flask_mail import Message

main_bp = Blueprint('main', __name__, url_prefix='')


@main_bp.route('/')
def index():
    events = Event.query.order_by(Event.date.desc()).all()
    books = Book.query.order_by(Book.created_at.desc()).all()
    photos = Photo.query.order_by(Photo.created_at.desc()).all()
    form = ContactForm()
    return render_template('index.html', events=events, books=books, photos=photos, form=form)


def _mail_is_configured(app):
    sender = app.config.get('MAIL_DEFAULT_SENDER')
    server = app.config.get('MAIL_SERVER')
    username = app.config.get('MAIL_USERNAME')
    password = app.config.get('MAIL_PASSWORD')
    if not sender or not server or not username or not password:
        return False
    if 'your-' in username.lower() or 'your-' in password.lower():
        return False
    return True


@main_bp.route('/contact', methods=['POST'])
@limiter.limit("5 per minute")
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        msg_body = (
            f"From: {form.name.data} <{form.email.data}>\n"
            f"Organization: {form.org.data or 'N/A'}\n\n"
            f"Message:\n{form.message.data}"
        )
        if _mail_is_configured(current_app):
            msg = Message(
                subject=f"New Message from {form.name.data} ({form.org.data or 'No org'})",
                recipients=[current_app.config['MAIL_DEFAULT_SENDER']],
            )
            msg.body = msg_body
            try:
                mail.send(msg)
                flash('Your message has been sent successfully!')
            except Exception as e:
                current_app.logger.error("Failed to send email: %s", e)
                flash('There was an error sending your message. Please try again later.')
        else:
            current_app.logger.info("Mail not configured — logging message instead:\n%s", msg_body)
            flash('Your message has been received (mail server not configured).')
    else:
        for field, errors in form.errors.items():
            for error in errors:
                flash(f'{error}')

    return redirect(url_for('main.index', _anchor='contact'))


@main_bp.route('/api/events')
def api_events():
    events = Event.query.order_by(Event.date.desc()).all()
    return jsonify([{
        'id': e.id,
        'title': e.title,
        'date': e.date.isoformat() if e.date else None,
        'display_date': e.display_date,
        'day': e.day,
        'month_year': e.month_year,
        'location': e.location,
        'description': e.description,
    } for e in events])


@main_bp.route('/api/books')
def api_books():
    books = Book.query.order_by(Book.created_at.desc()).all()
    return jsonify([{
        'id': b.id,
        'title': b.title,
        'subtitle': b.subtitle,
        'author': b.author,
        'status': b.status,
        'description': b.description,
        'publisher_info': b.publisher_info,
        'buy_link': b.buy_link,
        'cover_image_class': b.cover_image_class,
        'is_authored': b.is_authored,
    } for b in books])


@main_bp.route('/api/photos')
def api_photos():
    photos = Photo.query.order_by(Photo.created_at.desc()).all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'image_path': p.image_path,
        'caption': p.caption,
        'is_featured': p.is_featured,
        'span_two': p.span_two,
    } for p in photos])
