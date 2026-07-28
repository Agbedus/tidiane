from sqladmin import ModelView

from models import ContactMessage, GalleryPhoto, Testimonial, Book


class ContactMessageAdmin(ModelView, model=ContactMessage):
    column_list = [ContactMessage.id, ContactMessage.name, ContactMessage.email, ContactMessage.created_at]
    column_searchable_list = [ContactMessage.name, ContactMessage.email]
    column_sortable_list = [ContactMessage.id, ContactMessage.created_at]
    name = "Contact Message"
    name_plural = "Contact Messages"
    icon = "fa-solid fa-envelope"
    can_create = False
    can_edit = False
    can_delete = True
    can_export = True
    column_default_sort = (ContactMessage.created_at, True)


class GalleryPhotoAdmin(ModelView, model=GalleryPhoto):
    column_list = [GalleryPhoto.id, GalleryPhoto.caption, GalleryPhoto.image_url, GalleryPhoto.span, GalleryPhoto.sort_order]
    column_searchable_list = [GalleryPhoto.caption]
    column_sortable_list = [GalleryPhoto.id, GalleryPhoto.sort_order]
    name = "Gallery Photo"
    name_plural = "Gallery Photos"
    icon = "fa-solid fa-image"
    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    column_default_sort = (GalleryPhoto.sort_order, False)


class TestimonialAdmin(ModelView, model=Testimonial):
    column_list = [Testimonial.id, Testimonial.name_en, Testimonial.role_en, Testimonial.image_url, Testimonial.sort_order]
    column_searchable_list = [Testimonial.name_en, Testimonial.name_fr, Testimonial.role_en]
    column_sortable_list = [Testimonial.id, Testimonial.sort_order]
    name = "Testimonial"
    name_plural = "Testimonials"
    icon = "fa-solid fa-quote-right"
    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    column_default_sort = (Testimonial.sort_order, False)


class BookAdmin(ModelView, model=Book):
    column_list = [Book.id, Book.title_en, Book.title_fr, Book.teaser_en, Book.teaser_fr, Book.cover_image_url, Book.cover_image_fr_url, Book.sort_order]
    column_searchable_list = [Book.title_en, Book.title_fr, Book.teaser_en, Book.teaser_fr]
    column_sortable_list = [Book.id, Book.sort_order]
    name = "Book"
    name_plural = "Books"
    icon = "fa-solid fa-book"
    can_create = True
    can_edit = True
    can_delete = True
    can_export = True
    column_default_sort = (Book.sort_order, False)
    form_columns = [Book.title_en, Book.title_fr, Book.teaser_en, Book.teaser_fr, Book.description_en, Book.description_fr, Book.status, Book.cover_image_url, Book.cover_image_fr_url, Book.sort_order]
