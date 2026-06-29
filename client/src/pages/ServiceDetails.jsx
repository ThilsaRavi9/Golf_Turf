import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiDollarSign } from 'react-icons/fi';
import { pageTransition, fadeInUp } from '../animations/variants';
import { getService } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getService(id)
      .then(data => setService(data))
      .catch(err => {
        console.error(err);
        setError('Service not found or server error');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SkeletonLoader type="text" count={2} />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error || 'Service not found'}</h2>
        <Link to="/" className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.main {...pageTransition} className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 font-semibold mb-8 transition-colors">
        <FiArrowLeft /> Back to Home
      </Link>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-8">
        <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-premium">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            {service.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white font-[Poppins] mt-4 mb-6">
            {service.title}
          </h1>
          <div className="prose prose-green dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>
        </div>

        {/* Extra info panel for a premium feel */}
        <div className="bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-700 dark:text-green-400">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase">Duration</h4>
              <p className="text-sm font-semibold text-gray-855 dark:text-gray-200">Flexible/Ongoing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-700 dark:text-green-400">
              <FiDollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase">Pricing</h4>
              <p className="text-sm font-semibold text-gray-855 dark:text-gray-200">Contact For Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-700 dark:text-green-400">
              <span className="text-lg">⭐</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase">Availability</h4>
              <p className="text-sm font-semibold text-gray-855 dark:text-gray-200">Booking Required</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
