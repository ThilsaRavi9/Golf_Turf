from flask import Blueprint, jsonify
from models.gallery import Gallery

gallery_bp = Blueprint('gallery', __name__)

@gallery_bp.route('/gallery', methods=['GET'])
def get_gallery():
    images = Gallery.query.all()
    return jsonify([g.to_dict() for g in images])
