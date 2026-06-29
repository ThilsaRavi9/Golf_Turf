from flask import Blueprint, request, jsonify
from models import db
from models.service import Service

services_bp = Blueprint('services', __name__)

@services_bp.route('/services', methods=['GET'])
def get_services():
    category = request.args.get('category')
    query = Service.query
    if category and category != 'All':
        query = query.filter_by(category=category)
    services = query.all()
    return jsonify([s.to_dict() for s in services])

@services_bp.route('/services/<int:id>', methods=['GET'])
def get_service(id):
    service = Service.query.get_or_404(id)
    return jsonify(service.to_dict())

@services_bp.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    service = Service(
        title=data['title'],
        description=data['description'],
        image=data.get('image', ''),
        category=data.get('category', 'General')
    )
    db.session.add(service)
    db.session.commit()
    return jsonify(service.to_dict()), 201

@services_bp.route('/services/<int:id>', methods=['PUT'])
def update_service(id):
    service = Service.query.get_or_404(id)
    data = request.get_json()
    service.title = data.get('title', service.title)
    service.description = data.get('description', service.description)
    service.image = data.get('image', service.image)
    service.category = data.get('category', service.category)
    db.session.commit()
    return jsonify(service.to_dict())

@services_bp.route('/services/<int:id>', methods=['DELETE'])
def delete_service(id):
    service = Service.query.get_or_404(id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service deleted'}), 200
