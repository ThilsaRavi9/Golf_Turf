"""Seed the database with initial data using Unsplash images."""
from app import app
from models import db
from models.service import Service
from models.blog import Blog
from models.course import Course
from models.testimonial import Testimonial
from models.gallery import Gallery


def seed():
    with app.app_context():
        # Clear existing data
        Service.query.delete()
        Blog.query.delete()
        Course.query.delete()
        Testimonial.query.delete()
        Gallery.query.delete()

        # --- Services ---
        services = [
            Service(
                title='Golf Technology Boom',
                description='Explore the latest in golf technology including launch monitors, GPS devices, and smart clubs that are revolutionizing the game.',
                image='https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
                category='Membership'
            ),
            Service(
                title='Scottie Scheffler Claims World',
                description='Follow the rise of top golfers and their journey to becoming world champions through dedication and skill.',
                image='https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80',
                category='Training'
            ),
            Service(
                title='Gear Up for Paris Showdown',
                description='Premium golf equipment and apparel to prepare for international tournaments and competitions.',
                image='https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
                category='Coaching'
            ),
            Service(
                title='Golf Tournament Announced',
                description='Major golf tournaments announced for the upcoming season with exciting new venues and formats.',
                image='https://images.unsplash.com/photo-1632932197818-3891c4102e7b?w=600&q=80',
                category='Tournaments'
            ),
        ]

        # --- Blogs ---
        blogs = [
            Blog(
                title='Master The Art of Golf at Riverside',
                description='Discover the secrets to improving your golf game at our world-class Riverside course. From driving techniques to putting precision, our expert instructors guide you through every aspect of the game.',
                image='https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80',
                author='James Mitchell'
            ),
            Blog(
                title='The Perfect Golf Swing: A Complete Guide',
                description='Learn the fundamentals of a perfect golf swing from professional instructors. This comprehensive guide covers grip, stance, backswing, and follow-through.',
                image='https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
                author='Sarah Chen'
            ),
            Blog(
                title='Top 10 Golf Courses Around the World',
                description='Explore the most breathtaking golf courses across the globe, from Scotland\'s historic links to tropical island paradises.',
                image='https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
                author='David Parker'
            ),
            Blog(
                title='Golf Fitness: Exercises for Better Performance',
                description='Stay in peak physical condition with these golf-specific exercises designed to improve flexibility, strength, and endurance on the course.',
                image='https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80',
                author='Emily Rodriguez'
            ),
        ]

        # --- Courses ---
        courses = [
            Course(
                name='Beginner Golf Fundamentals',
                duration='4 Weeks',
                price=199.99,
                image='https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
                description='Perfect for newcomers. Learn grip, stance, swing basics, and course etiquette.'
            ),
            Course(
                name='Advanced Swing Techniques',
                duration='6 Weeks',
                price=349.99,
                image='https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80',
                description='Refine your swing mechanics and develop consistency with advanced drills.'
            ),
            Course(
                name='Short Game Mastery',
                duration='3 Weeks',
                price=249.99,
                image='https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
                description='Master chipping, pitching, and putting to shave strokes off your score.'
            ),
            Course(
                name='Tournament Preparation',
                duration='8 Weeks',
                price=499.99,
                image='https://images.unsplash.com/photo-1632932197818-3891c4102e7b?w=600&q=80',
                description='Comprehensive preparation for competitive golf tournaments.'
            ),
        ]

        # --- Testimonials ---
        testimonials = [
            Testimonial(
                name='Robert Anderson',
                role='Amateur Golfer',
                content='The coaching program completely transformed my game. I went from a 24 handicap to a 12 in just six months. The instructors are world-class!',
                avatar='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
                rating=5
            ),
            Testimonial(
                name='Jennifer Williams',
                role='Club Member',
                content='The facilities are stunning and the course is maintained to perfection. Every round feels like a premium experience. Highly recommend the membership!',
                avatar='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
                rating=5
            ),
            Testimonial(
                name='Michael Thompson',
                role='Professional Golfer',
                content='As a pro, I need top-tier training facilities. This club delivers beyond expectations. The technology integration and coaching staff are exceptional.',
                avatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
                rating=5
            ),
            Testimonial(
                name='Lisa Martinez',
                role='Weekend Golfer',
                content='Perfect for weekend golfers like me. The staff is friendly, the course is beautiful, and the beginner program helped me fall in love with the sport.',
                avatar='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
                rating=4
            ),
        ]

        # --- Gallery ---
        gallery_items = [
            Gallery(title='Sunrise at the 18th', image='https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80', category='Course'),
            Gallery(title='Practice Range', image='https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80', category='Training'),
            Gallery(title='Aerial View', image='https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80', category='Course'),
            Gallery(title='Putting Green', image='https://images.unsplash.com/photo-1632932197818-3891c4102e7b?w=800&q=80', category='Course'),
            Gallery(title='Club House', image='https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80', category='Facilities'),
            Gallery(title='Golf Cart Path', image='https://images.unsplash.com/photo-1600791280003-a4bfcb444ca3?w=800&q=80', category='Course'),
        ]

        db.session.add_all(services + blogs + courses + testimonials + gallery_items)
        db.session.commit()
        print('SUCCESS: Database seeded successfully!')


if __name__ == '__main__':
    seed()
