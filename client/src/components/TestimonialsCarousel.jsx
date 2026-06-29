import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import { fadeInUp } from '../animations/variants';
import { getTestimonials } from '../services/api';

const fallback = [
  {
    id: 1,
    name: 'Robert Anderson',
    role: 'Amateur Golfer',
    content: 'The coaching program completely transformed my game. I went from a 24 handicap to a 12 in just six months!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jennifer Williams',
    role: 'Club Member',
    content: 'The facilities are stunning and the course is maintained to perfection. Every round feels like a premium experience.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Thompson',
    role: 'Professional Golfer',
    content: 'As a pro, I need top-tier training facilities. This club delivers beyond expectations.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
  },
  {
    id: 4,
    name: 'Lisa Martinez',
    role: 'Weekend Golfer',
    content: 'Perfect for weekend golfers like me. The beginner program helped me fall in love with the sport.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 4,
  },
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState(fallback);

  useEffect(() => {
    getTestimonials()
      .then(data => { if (data?.length) setTestimonials(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-dark-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-[Poppins] mt-2">
            What Our Members Say
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white dark:bg-dark-surface rounded-2xl p-7 shadow-card h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
