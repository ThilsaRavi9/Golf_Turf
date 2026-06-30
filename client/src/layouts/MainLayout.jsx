import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-950 transition-colors duration-300 dark:bg-white dark:text-gray-950">
      <ScrollProgress />
      <div className="min-h-screen w-full bg-white">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
