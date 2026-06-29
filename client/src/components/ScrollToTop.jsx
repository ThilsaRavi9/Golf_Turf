import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { useScrollPosition } from '../hooks';

export default function ScrollToTop() {
  const { scrollY } = useScrollPosition();
  const show = scrollY > 300;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            zIndex: 9999,
            width: '3rem',
            height: '3rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 20px rgba(46,125,50,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <FiArrowUp style={{ width: '1.25rem', height: '1.25rem', strokeWidth: 2.5 }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
