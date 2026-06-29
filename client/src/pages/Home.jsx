import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Hero from '../components/Hero';
import About from '../components/About';
import Collection from '../components/Collection';
import Instructor from '../components/Instructor';
import AnimatedCounters from '../components/AnimatedCounters';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <motion.main {...pageTransition}>
      <Hero />
      <About />
      <AnimatedCounters />
      <Collection />
      <Instructor />
      <TestimonialsCarousel />
      <Newsletter />
    </motion.main>
  );
}
