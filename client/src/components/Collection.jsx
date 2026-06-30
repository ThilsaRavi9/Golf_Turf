import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { getServices } from '../services/api';

const filters = ['All', 'Coaching', 'Golf Club', 'Golf Apparel'];

const fallbackServices = [
  {
    id: 1,
    title: 'Golf Technology Boom',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
    category: 'Membership',
    filter: 'Golf Club',
  },
  {
    id: 2,
    title: 'Scottie Scheffler Claims World',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80',
    category: 'Training',
    filter: 'Coaching',
  },
  {
    id: 3,
    title: 'Gear Up for Paris Showdown',
    image: 'https://images.unsplash.com/photo-1600791280003-a4bfcb444ca3?w=600&q=80',
    category: 'Coaching',
    filter: 'Golf Club',
  },
  {
    id: 4,
    title: 'Golf Tournament Announced',
    image: 'https://images.unsplash.com/photo-1632932197818-3891c4102e7b?w=600&q=80',
    category: 'Tournaments',
    filter: 'Golf Apparel',
  },
];

export default function Collection() {
  const [active, setActive] = useState('All');
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    getServices()
      .then(data => {
        if (data && data.length > 0) setServices(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  const cards = fallbackServices.map((fallback, index) => ({
    ...fallback,
    ...(services[index] || {}),
    filter: fallback.filter,
  }));
  const filtered = active === 'All' ? cards : cards.filter(card => card.filter === active);

  return (
    <section id="collection" className="px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-[10px] font-normal text-black">Sport Collection</span>
            <h2 className="mt-1 font-[Poppins] text-[28px] font-normal leading-[0.98] text-black">
              <span className="font-bold">Experience the Golf Trip of<br />
              </span>Your Dreams With Us
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 pb-1">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`rounded-full px-3 py-1 text-[7px] font-bold uppercase transition-all duration-300 ${
                  active === filter ? 'bg-[#caff24] text-black' : 'bg-white text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-gray-400">
            <p className="text-sm font-medium">No items found in this category.</p>
          </motion.div>
        ) : (
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filtered.map(item => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="group relative aspect-[1.02/1] cursor-pointer overflow-hidden rounded-[7px] img-zoom"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={event => {
                    event.currentTarget.src = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80" />
                <div className="absolute left-2 top-2">
                  <span className="rounded-full bg-white/25 px-2 py-1 text-[6px] font-bold uppercase tracking-wider text-white">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="max-w-[110px] text-[12px] font-medium leading-[1.05] text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
