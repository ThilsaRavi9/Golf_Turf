from flask import Blueprint, request, jsonify
from models import db
from models.contact import Contact

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'error': 'Name, email, and message are required'}), 400

    contact = Contact(
        name=name,
        email=email,
        subject=data.get('subject', ''),
        message=message
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify({'message': 'Message sent successfully!', 'contact': contact.to_dict()}), 201

@contact_bp.route('/contact', methods=['GET'])
def get_contacts():
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    return jsonify([c.to_dict() for c in contacts])
