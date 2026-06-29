import { motion } from 'framer-motion';
import { useScrollPosition } from '../hooks';

export default function ScrollProgress() {
  const { scrollProgress } = useScrollPosition();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX: scrollProgress / 100,
        background: 'linear-gradient(90deg, #1B5E20, #4CAF50, #81C784)',
      }}
      initial={{ scaleX: 0 }}
    />
  );
}
