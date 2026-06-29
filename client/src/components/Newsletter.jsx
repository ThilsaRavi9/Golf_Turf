import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { fadeInUp, fadeInLeft, fadeInRight } from '../animations/variants';
import { subscribeNewsletter } from '../services/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const data = await subscribeNewsletter(email);
      setStatus('success');
      setMessage(data.message || 'Successfully subscribed!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative bg-green-900 rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
            {/* Left Image */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80"
                alt="Beautiful premium sunny golf course"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-900/90" />
            </motion.div>

            {/* Right Content */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 md:p-14 flex flex-col justify-center"
            >
              <span className="inline-block bg-green-700/50 text-green-200 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mb-6">
                SUBSCRIBE
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-[Poppins] leading-tight mb-6">
                Teeing Up for Success:{' '}
                <span className="text-green-300">The Latest Golf News, Tips, and Trends!</span>
              </h3>

              <form onSubmit={handleSubmit} className="flex gap-0 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 px-5 py-3.5 rounded-l-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-400 text-white px-5 py-3.5 rounded-r-full transition-all duration-300 flex items-center justify-center btn-ripple disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiArrowRight className="w-5 h-5" />
                  )}
                </button>
              </form>

              {status && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm mt-4 ${
                    status === 'success' ? 'text-green-300' : 'text-red-300'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
