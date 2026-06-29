import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';
import { useScrollPosition } from '../hooks';
import { slideInNav } from '../animations/variants';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Support', path: '/contact' },
];

export default function Navbar() {
  const { scrollY } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isScrolled = scrollY > 50;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      variants={slideInNav}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className={`text-2xl font-extrabold tracking-tight font-[Poppins] transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
              }`}
            >
              SPRING
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-green-700 dark:hover:text-green-400 ${
                  location.pathname === link.path
                    ? 'text-green-700 dark:text-green-400'
                    : isScrolled
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-800 dark:hover:bg-green-50 transition-all duration-300 btn-ripple group"
            >
              GET STARTED
              <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiX className="w-6 h-6 text-gray-800 dark:text-white" />
              ) : (
                <HiOutlineMenuAlt3 className="w-6 h-6 text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-surface overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-surface'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-full font-semibold btn-ripple"
                >
                  GET STARTED
                  <FiArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
