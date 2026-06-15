from flask import redirect, url_for, session, Blueprint, render_template, request
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import db, Event, Book, Photo
from app.config import Config
from app.forms import AdminLoginForm
from app.extensions import limiter

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

_admin_password_hash = generate_password_hash(Config.ADMIN_PASSWORD)


@auth_bp.route('/login', methods=['GET', 'POST'])
@limiter.limit("10 per minute")
def login():
    if session.get('admin_logged_in'):
        return redirect(url_for('admin.index'))

    form = AdminLoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        if username == Config.ADMIN_USERNAME and check_password_hash(_admin_password_hash, password):
            session['admin_logged_in'] = True
            session.permanent = True
            return redirect(url_for('admin.index'))
        return render_template('admin/login.html', form=form, error='Invalid credentials')

    return render_template('admin/login.html', form=form, error=None)


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('auth.login'))


class AuthModelView(ModelView):
    def is_accessible(self):
        return session.get('admin_logged_in')

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('auth.login'))


class AuthAdminIndex(AdminIndexView):
    def is_accessible(self):
        return session.get('admin_logged_in')

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('auth.login'))


def init_admin(app):
    admin = Admin(app, name='Dr. Tidiane CMS', template_mode='bootstrap3', index_view=AuthAdminIndex())
    admin.add_view(AuthModelView(Event, db.session))
    admin.add_view(AuthModelView(Book, db.session))
    admin.add_view(AuthModelView(Photo, db.session))
