from . import db

class Testimonial(db.Model):
    __tablename__ = 'testimonials'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    avatar = db.Column(db.String(500), default='')
    rating = db.Column(db.Integer, default=5)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'content': self.content,
            'avatar': self.avatar,
            'rating': self.rating,
        }
