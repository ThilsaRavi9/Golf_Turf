import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { pageTransition, fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { getBlogs } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';

const fallbackBlogs = [
  {
    id: 1,
    title: 'Master The Art of Golf at Riverside',
    description: 'Discover the secrets to improving your golf game at our world-class Riverside course.',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80',
    author: 'James Mitchell',
    date: '2026-06-15',
  },
  {
    id: 2,
    title: 'The Perfect Golf Swing: A Complete Guide',
    description: 'Learn the fundamentals of a perfect golf swing from professional instructors.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
    author: 'Sarah Chen',
    date: '2026-06-10',
  },
  {
    id: 3,
    title: 'Top 10 Golf Courses Around the World',
    description: 'Explore the most breathtaking golf courses across the globe.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    author: 'David Parker',
    date: '2026-06-05',
  },
  {
    id: 4,
    title: 'Golf Fitness: Exercises for Better Performance',
    description: 'Stay in peak physical condition with golf-specific exercises.',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80',
    author: 'Emily Rodriguez',
    date: '2026-05-28',
  },
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(data => setBlogs(data?.length ? data : fallbackBlogs))
      .catch(() => setBlogs(fallbackBlogs))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.main {...pageTransition} className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-[Poppins] mt-2">
            Latest News & Articles
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            Stay updated with the latest golf tips, course reviews, and industry news.
          </p>
        </motion.div>

        {loading ? (
          <SkeletonLoader type="blog" count={4} />
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => (
              <motion.article
                key={blog.id}
                variants={staggerItem}
                className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-card card-lift group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden img-zoom">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FiUser className="w-3 h-3" />
                      {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-green-700 dark:text-green-400 text-sm font-semibold group-hover:gap-2 transition-all">
                    Read More <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
