from pydantic import BaseModel, EmailStr, field_validator


class ContactForm(BaseModel):
    name: str
    organisation: str = ""
    email: EmailStr
    message: str

    @field_validator("name", "message")
    def check_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field must not be empty")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    detail: str
