from flask import Blueprint, jsonify
from models.testimonial import Testimonial

testimonials_bp = Blueprint('testimonials', __name__)

@testimonials_bp.route('/testimonials', methods=['GET'])
def get_testimonials():
    testimonials = Testimonial.query.all()
    return jsonify([t.to_dict() for t in testimonials])
