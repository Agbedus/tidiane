from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, PasswordField
from wtforms.validators import DataRequired, Email, Length


class ContactForm(FlaskForm):
    name = StringField('Full Name', validators=[
        DataRequired(message='Please enter your name.'),
        Length(max=200, message='Name must be under 200 characters.'),
    ])
    org = StringField('Organisation', validators=[
        Length(max=200, message='Organisation must be under 200 characters.'),
    ])
    email = StringField('Email', validators=[
        DataRequired(message='Please enter your email.'),
        Email(message='Please enter a valid email address.'),
        Length(max=200),
    ])
    message = TextAreaField('Message', validators=[
        DataRequired(message='Please enter your message.'),
        Length(min=10, max=5000, message='Message must be between 10 and 5000 characters.'),
    ])


class AdminLoginForm(FlaskForm):
    username = StringField('Username', validators=[
        DataRequired(message='Please enter your username.'),
    ])
    password = PasswordField('Password', validators=[
        DataRequired(message='Please enter your password.'),
    ])
