import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle({ isDark, toggle }) {
  return (
    <motion.button
      key="dark-mode-toggle"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        width: '3rem',
        height: '3rem',
        borderRadius: '9999px',
        background: isDark ? '#1a2e1d' : '#ffffff',
        border: isDark ? '2px solid #374151' : '2px solid #e5e7eb',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {isDark ? (
        <FiSun style={{ width: '1.25rem', height: '1.25rem', color: '#facc15' }} />
      ) : (
        <FiMoon style={{ width: '1.25rem', height: '1.25rem', color: '#374151' }} />
      )}
    </motion.button>
  );
}
