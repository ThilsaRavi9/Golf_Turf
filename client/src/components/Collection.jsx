import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { getServices } from '../services/api';

const filters = ['All', 'Coaching', 'Golf Club', 'Golf Apparel'];

// Fallback data when backend is unavailable
const fallbackServices = [
  {
    id: 1,
    title: 'Golf Technology Boom',
    description: 'Explore the latest in golf technology including launch monitors, GPS devices, and smart clubs.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
    category: 'Membership',
  },
  {
    id: 2,
    title: 'Scottie Scheffler Claims World',
    description: 'Follow the rise of top golfers and their journey to becoming world champions.',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80',
    category: 'Training',
  },
  {
    id: 3,
    title: 'Gear Up for Paris Showdown',
    description: 'Premium golf equipment and apparel to prepare for international tournaments.',
    image: 'https://images.unsplash.com/photo-1600791280003-a4bfcb444ca3?w=600&q=80',
    category: 'Coaching',
  },
  {
    id: 4,
    title: 'Golf Tournament Announced',
    description: 'Major golf tournaments announced for the upcoming season.',
    image: 'https://images.unsplash.com/photo-1632932197818-3891c4102e7b?w=600&q=80',
    category: 'Tournaments',
  },
];

export default function Collection() {
  const [active, setActive] = useState('All');
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    getServices()
      .then(data => {
        if (data && data.length > 0) setServices(data);
      })
      .catch(() => {});
  }, []);

  const filtered = active === 'All' ? services : services.filter(s => s.category === active);

  return (
    <section id="collection" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-dark-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
              Sport Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-[Poppins] mt-2 leading-tight">
              Experience the Golf Trip<br />
              of <span className="text-gradient">Your Dreams</span> With Us
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  active === f
                    ? 'bg-green-800 text-white shadow-md'
                    : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Card Grid — key={active} forces re-mount so stagger replays on every filter change */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-gray-400 dark:text-gray-500"
          >
            <p className="text-lg font-medium">No items found in this category.</p>
          </motion.div>
        ) : (
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group card-lift img-zoom"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80';
                  }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-lg font-bold leading-snug">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
