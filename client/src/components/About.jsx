import { motion } from 'framer-motion';
import { MdOutlineGolfCourse, MdSportsTennis } from 'react-icons/md';
import { GiGolfFlag, GiGolfTee } from 'react-icons/gi';
import { fadeInUp, staggerContainer, staggerItem, hoverLift } from '../animations/variants';

const icons = [
  { Icon: MdOutlineGolfCourse, label: 'Courses' },
  { Icon: GiGolfFlag, label: 'Tournaments' },
  { Icon: MdSportsTennis, label: 'Training' },
  { Icon: GiGolfTee, label: 'Equipment' },
];

const imageCards = [
  {
    src: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500&q=80',
    alt: 'Golfer swinging on a lush green course',
    tag: null,
  },
  {
    src: 'https://images.unsplash.com/photo-1600791280003-a4bfcb444ca3?w=500&q=80',
    alt: 'Golf club hitting ball close-up',
    tag: 'MEMBERSHIP',
  },
  {
    src: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&q=80',
    alt: 'Golf ball on tee at sunset',
    tag: null,
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Icons Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex justify-center gap-10 md:gap-16 mb-10"
        >
          {icons.map(({ Icon, label }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-dark-surface flex items-center justify-center group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors duration-300">
                <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider hidden md:block">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            Golf is a precision club-and-ball sport where players use various clubs to hit balls into
            a series of holes on a course in as few strokes as possible. Golf is a precision sport
            where players use clubs to hit a small ball into a series of holes on a course in as few
            strokes as possible.
          </p>
        </motion.div>

        {/* Three Image Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {imageCards.map((card, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer card-lift img-zoom group"
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {card.tag && (
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-dark-surface/90 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 dark:text-green-400">
                    {card.tag}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex justify-center mt-16">
          <div className="divider" />
        </div>
      </div>
    </section>
  );
}
