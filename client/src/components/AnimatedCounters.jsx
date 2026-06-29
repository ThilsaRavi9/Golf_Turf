import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../hooks';
import { staggerContainer, staggerItem } from '../animations/variants';

const stats = [
  { value: 35, suffix: 'K+', label: 'Happy Members' },
  { value: 120, suffix: '+', label: 'Expert Coaches' },
  { value: 50, suffix: '+', label: 'Golf Courses' },
  { value: 15, suffix: '+', label: 'Years Experience' },
];

function CounterCard({ value, suffix, label }) {
  const { count, ref } = useAnimatedCounter(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 font-[Poppins]">
        {count}{suffix}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export default function AnimatedCounters() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <CounterCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
