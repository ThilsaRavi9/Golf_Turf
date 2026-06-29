import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowUpRight } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../animations/variants';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/#collection' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
];

const servicesLinks = [
  { name: 'Golf Coaching', path: '/' },
  { name: 'Membership', path: '/' },
  { name: 'Equipment', path: '/' },
  { name: 'Tournaments', path: '/' },
  { name: 'Training', path: '/' },
];

const socials = [
  { Icon: FiInstagram, href: '#', label: 'Instagram' },
  { Icon: FiTwitter, href: '#', label: 'Twitter' },
  { Icon: FiFacebook, href: '#', label: 'Facebook' },
  { Icon: FiYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-dark-bg text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14"
        >
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <h3 className="text-2xl font-extrabold font-[Poppins] mb-4">SPRING</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience premium golf in perfect surroundings. World-class courses, expert coaching, and unforgettable moments on the green.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-600 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem}>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.name}
                    <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📍 123 Golf Course Drive</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ hello@springgolf.com</li>
              <li>🕐 Mon - Sun: 6AM - 8PM</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SPRING Golf. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
