import os
from flask import Flask
from flask_cors import CORS
from models import db

def create_app():
    app = Flask(__name__, static_folder='uploads', static_url_path='/uploads')
    
    # Configuration
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DATABASE_URL', f'sqlite:///{os.path.join(basedir, "database", "golf_turf.db")}'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = os.path.join(basedir, 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)

    # Register blueprints
    from routes.services import services_bp
    from routes.blogs import blogs_bp
    from routes.courses import courses_bp
    from routes.newsletter import newsletter_bp
    from routes.gallery import gallery_bp
    from routes.testimonials import testimonials_bp
    from routes.contact import contact_bp

    app.register_blueprint(services_bp, url_prefix='/api')
    app.register_blueprint(blogs_bp, url_prefix='/api')
    app.register_blueprint(courses_bp, url_prefix='/api')
    app.register_blueprint(newsletter_bp, url_prefix='/api')
    app.register_blueprint(gallery_bp, url_prefix='/api')
    app.register_blueprint(testimonials_bp, url_prefix='/api')
    app.register_blueprint(contact_bp, url_prefix='/api')

    # Create tables
    with app.app_context():
        os.makedirs(os.path.join(basedir, 'database'), exist_ok=True)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
