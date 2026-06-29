from flask import Blueprint, request, jsonify
from models import db
from models.course import Course

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([c.to_dict() for c in courses])

@courses_bp.route('/courses/<int:id>', methods=['GET'])
def get_course(id):
    course = Course.query.get_or_404(id)
    return jsonify(course.to_dict())

@courses_bp.route('/courses', methods=['POST'])
def create_course():
    data = request.get_json()
    course = Course(
        name=data['name'],
        duration=data['duration'],
        price=data['price'],
        image=data.get('image', ''),
        description=data.get('description', '')
    )
    db.session.add(course)
    db.session.commit()
    return jsonify(course.to_dict()), 201

@courses_bp.route('/courses/<int:id>', methods=['PUT'])
def update_course(id):
    course = Course.query.get_or_404(id)
    data = request.get_json()
    course.name = data.get('name', course.name)
    course.duration = data.get('duration', course.duration)
    course.price = data.get('price', course.price)
    course.image = data.get('image', course.image)
    course.description = data.get('description', course.description)
    db.session.commit()
    return jsonify(course.to_dict())

@courses_bp.route('/courses/<int:id>', methods=['DELETE'])
def delete_course(id):
    course = Course.query.get_or_404(id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Course deleted'}), 200
