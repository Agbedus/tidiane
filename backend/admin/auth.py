from starlette.requests import Request
from sqladmin.authentication import AuthenticationBackend

from backend.config import settings


class AdminAuth(AuthenticationBackend):
    def __init__(self):
        super().__init__(secret_key=settings.SESSION_SECRET)

    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form.get("username", "")
        password = form.get("password", "")
        if username == settings.ADMIN_USERNAME and password == settings.ADMIN_PASSWORD:
            request.session["admin_user"] = username
            return True
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        return request.session.get("admin_user") == settings.ADMIN_USERNAME
