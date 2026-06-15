import logging
import sys

from flask import Flask, render_template
from app.config import Config
from app.models import db
from app.extensions import mail, csrf, migrate, limiter
from app.admin import init_admin, auth_bp
from app.routes import main_bp


def create_app() -> Flask:
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(Config)

    _configure_logging(app)

    db.init_app(app)
    mail.init_app(app)
    csrf.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)

    init_admin(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)

    @app.errorhandler(404)
    def not_found(e) -> tuple[str, int]:
        return render_template('index.html'), 404

    @app.errorhandler(500)
    def server_error(e) -> tuple[str, int]:
        return render_template('index.html'), 500

    with app.app_context():
        db.create_all()

    return app


def _configure_logging(app: Flask) -> None:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s %(name)s: %(message)s'
    ))
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO if not Config.DEBUG else logging.DEBUG)
