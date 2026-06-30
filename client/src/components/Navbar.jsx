import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';
import { slideInNav } from '../animations/variants';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Support', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
      className="relative z-50 px-4 pt-0 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px] rounded-t-[8px] bg-white px-0 py-3 sm:px-3">
        <nav className="flex h-7 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-[Poppins] text-[18px] font-extrabold tracking-tight text-black">
              SPRING
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[8px] font-medium transition-colors duration-300 hover:text-black ${
                  location.pathname === link.path
                    ? 'text-black'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px rounded-full bg-black"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden h-8 items-center gap-2 rounded-full bg-[#171717] px-5 text-[8px] font-semibold text-white transition-all duration-300 hover:bg-black md:flex"
            >
              GET STARTED
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
                <FiArrowUpRight className="h-2.5 w-2.5" />
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2 transition-colors hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiX className="h-6 w-6 text-gray-800" />
              ) : (
                <HiOutlineMenuAlt3 className="h-6 w-6 text-gray-800" />
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
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
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
                        : 'text-gray-700 hover:bg-gray-50'
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
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 py-3 font-semibold text-white"
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
