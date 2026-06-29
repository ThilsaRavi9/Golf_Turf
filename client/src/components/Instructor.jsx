import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { fadeInLeft, fadeInRight, fadeInUp } from '../animations/variants';

const categories = ['MEMBERSHIP', 'TRAINING', 'COACHING', 'TOURNAMENTS'];

export default function Instructor() {
  return (
    <section id="instructor" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Description */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-white">Professional maintenance and operation</span>{' '}
            of golf courses, ensuring optimal playing conditions, landscaping, professionals and
            sustainability practices.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Card */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-10 shadow-card relative overflow-hidden"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">35k</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-[Poppins] leading-tight mb-4">
              We Have <span className="text-gradient">The Best Instructors</span> To Teach You Golfing mates.
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
              Golf requires skill, strategy, and mental focus, and is enjoyed both competitively and recreationally.
            </p>

            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 btn-ripple group">
              EXPLORE MORE
              <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-1.5 bg-gray-50 dark:bg-dark-surface text-gray-600 dark:text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl overflow-hidden img-zoom aspect-[4/3] lg:aspect-auto lg:h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80"
              alt="Aerial view of a beautiful golf course with green fairways"
              className="w-full h-full object-cover min-h-[400px]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
