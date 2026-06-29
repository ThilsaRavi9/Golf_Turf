import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { getGallery } from '../services/api';

const fallbackGallery = [
  { id: 1, title: 'Sunrise at the 18th', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80', category: 'Course' },
  { id: 2, title: 'Practice Range', image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80', category: 'Training' },
  { id: 3, title: 'Aerial View', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80', category: 'Course' },
  { id: 4, title: 'Putting Green', image: 'https://images.unsplash.com/photo-1632932197818-3891c4102e7b?w=800&q=80', category: 'Course' },
  { id: 5, title: 'Club House', image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80', category: 'Facilities' },
  { id: 6, title: 'Golf Cart Path', image: 'https://images.unsplash.com/photo-1600791280003-a4bfcb444ca3?w=800&q=80', category: 'Course' },
];

const categories = ['All', 'Course', 'Training', 'Facilities'];

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then(data => setGallery(data?.length ? data : fallbackGallery))
      .catch(() => setGallery(fallbackGallery))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? gallery : gallery.filter(g => g.category === filter);

  return (
    <motion.main {...pageTransition} className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
            Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-[Poppins] mt-2">
            Explore Our Grounds
          </h1>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-green-800 text-white'
                  : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-green-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              layout
              className="relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group card-lift img-zoom"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <span className="text-green-300 text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                <h3 className="text-white text-lg font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
