from flask import Blueprint, request, jsonify
from models import db
from models.newsletter import Newsletter

newsletter_bp = Blueprint('newsletter', __name__)

@newsletter_bp.route('/newsletter', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email', '').strip()
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    existing = Newsletter.query.filter_by(email=email).first()
    if existing:
        return jsonify({'error': 'Email already subscribed'}), 409

    subscriber = Newsletter(email=email)
    db.session.add(subscriber)
    db.session.commit()
    return jsonify({'message': 'Successfully subscribed!', 'subscriber': subscriber.to_dict()}), 201

@newsletter_bp.route('/newsletter', methods=['GET'])
def get_subscribers():
    subscribers = Newsletter.query.order_by(Newsletter.created_at.desc()).all()
    return jsonify([s.to_dict() for s in subscribers])

@newsletter_bp.route('/newsletter/<int:id>', methods=['DELETE'])
def delete_subscriber(id):
    subscriber = Newsletter.query.get_or_404(id)
    db.session.delete(subscriber)
    db.session.commit()
    return jsonify({'message': 'Subscriber removed'}), 200
