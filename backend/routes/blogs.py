from flask import Blueprint, request, jsonify
from models import db
from models.blog import Blog

blogs_bp = Blueprint('blogs', __name__)

@blogs_bp.route('/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.order_by(Blog.date.desc()).all()
    return jsonify([b.to_dict() for b in blogs])

@blogs_bp.route('/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    blog = Blog.query.get_or_404(id)
    return jsonify(blog.to_dict())

@blogs_bp.route('/blogs', methods=['POST'])
def create_blog():
    data = request.get_json()
    blog = Blog(
        title=data['title'],
        image=data.get('image', ''),
        description=data['description'],
        author=data.get('author', 'Admin')
    )
    db.session.add(blog)
    db.session.commit()
    return jsonify(blog.to_dict()), 201

@blogs_bp.route('/blogs/<int:id>', methods=['PUT'])
def update_blog(id):
    blog = Blog.query.get_or_404(id)
    data = request.get_json()
    blog.title = data.get('title', blog.title)
    blog.image = data.get('image', blog.image)
    blog.description = data.get('description', blog.description)
    blog.author = data.get('author', blog.author)
    db.session.commit()
    return jsonify(blog.to_dict())

@blogs_bp.route('/blogs/<int:id>', methods=['DELETE'])
def delete_blog(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({'message': 'Blog deleted'}), 200
