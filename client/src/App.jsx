import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ServiceDetails from './pages/ServiceDetails';
import Dashboard from './pages/admin/Dashboard';
import LoadingScreen from './components/LoadingScreen';

// Component to handle scroll restoration on route change
function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial page load delay to simulate high-end entrance transition
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={loading} />
      {!loading && (
        <MainLayout>
          <ScrollToTopOnRoute />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} /> {/* About rolls down/links to home parts or acts as home */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </MainLayout>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
