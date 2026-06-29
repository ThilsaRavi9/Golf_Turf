from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .service import Service
from .blog import Blog
from .course import Course
from .newsletter import Newsletter
from .testimonial import Testimonial
from .gallery import Gallery
from .contact import Contact
