import { useDarkMode } from '../hooks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import ScrollToTop from '../components/ScrollToTop';
import DarkModeToggle from '../components/DarkModeToggle';

export default function MainLayout({ children }) {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <div className="pt-4">{children}</div>

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <ScrollToTop />
      <DarkModeToggle isDark={isDark} toggle={toggle} />
    </div>
  );
}
