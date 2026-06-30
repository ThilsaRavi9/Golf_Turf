import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineGolfCourse, MdSportsTennis } from 'react-icons/md';
import { GiGolfFlag, GiGolfTee } from 'react-icons/gi';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

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

const sustainabilityCards = [
  {
    title: 'Master The Art of Golf at Riverside',
    label: 'Golf Training',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=700&q=85',
    tone: 'dark',
  },
  {
    title: 'Sustainable Turf Management',
    label: 'Eco Care',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=700&q=85',
    tone: 'light',
  },
  {
    title: 'Water-Smart Course Design',
    label: 'Green Systems',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=700&q=85',
    tone: 'light',
  },
];

export default function About() {
  const [activeCard, setActiveCard] = useState(0);
  const orderedSustainabilityCards = sustainabilityCards.map((_, index) => (
    sustainabilityCards[(activeCard + index) % sustainabilityCards.length]
  ));

  const showPreviousCard = () => {
    setActiveCard((current) => (current - 1 + sustainabilityCards.length) % sustainabilityCards.length);
  };

  const showNextCard = () => {
    setActiveCard((current) => (current + 1) % sustainabilityCards.length);
  };

  return (
    <section id="about" className="px-4 pb-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[980px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8 flex justify-center gap-9 md:gap-12"
        >
          {icons.map(({ Icon, label }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.08)] transition-colors duration-300 group-hover:bg-lime-100">
                <Icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-green-700" />
              </div>
              <span className="hidden text-[8px] font-medium uppercase tracking-wider text-gray-400 md:block">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mb-8 max-w-[690px] text-center"
        >
          <p className="text-[18px] leading-[1.25] text-black md:text-[19px]">
            <span className="font-bold">
              Golf is a precision club-and-ball sport where players use various clubs to hit balls into
              a series of holes on a course in as few strokes as possible.
            </span>{' '}
            Golf is a precision sport where players use clubs to hit a small ball into a series of holes on a course in as few
            strokes as possible.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto grid max-w-[520px] grid-cols-3 items-start gap-6"
        >
          {imageCards.map((card, i) => (
            <motion.div
              key={card.alt}
              variants={staggerItem}
              initial="rest"
              animate="rest"
              className={`group relative cursor-pointer overflow-hidden rounded-[7px] img-zoom ${
                i === 1 ? 'aspect-[1.45/1]' : 'aspect-[1.15/1]'
              }`}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={event => {
                  event.currentTarget.src = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              {card.tag && (
                <div className="absolute right-2 top-2 rounded-full bg-white/70 px-2 py-0.5">
                  <span className="text-[6px] font-bold uppercase tracking-wider text-white">
                    {card.tag}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-2 flex justify-center">
          <div className="h-px w-28 bg-[#252815]" />
        </div>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center font-[Poppins] text-[25px] font-normal leading-tight text-black"
        >
          Commit to<br /><span className="font-bold">Sustainability Initiatives</span>
        </motion.h2>

        <div className="mt-7 flex justify-end gap-3 pr-2">
          <button
            type="button"
            onClick={showPreviousCard}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
            aria-label="Previous sustainability card"
          >
            &lsaquo;
          </button>
          <button
            type="button"
            onClick={showNextCard}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#caff24] text-black"
            aria-label="Next sustainability card"
          >
            &rsaquo;
          </button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-7 grid gap-4 overflow-hidden md:grid-cols-[1.15fr_1fr_0.55fr]"
        >
          {orderedSustainabilityCards.map((card, index) => (
            <motion.article
              key={card.title}
              variants={staggerItem}
              className={`group relative min-h-[220px] overflow-hidden rounded-[8px] img-zoom ${
                index === 2 ? 'hidden md:block' : ''
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-full min-h-[220px] w-full object-cover"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 ${
                  card.tone === 'dark'
                    ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent'
                    : 'bg-gradient-to-t from-black/55 via-black/10 to-white/10'
                }`}
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/75 px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-black">
                {card.label}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="max-w-[260px] font-[Poppins] text-[20px] font-semibold leading-[1.05] text-white">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-[300px] text-[10px] leading-relaxed text-white/85">
                  Thoughtful turf care, smarter resource use, and premium playing conditions designed to last.
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
