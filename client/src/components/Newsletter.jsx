import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { fadeInUp } from '../animations/variants';
import { subscribeNewsletter } from '../services/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
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
    <section id="newsletter" className="px-4 pb-9 sm:px-6 lg:px-10">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto grid min-h-[150px] max-w-[1280px] overflow-hidden rounded-[8px] bg-gradient-to-br from-[#007a24] via-[#006e1e] to-[#052f14] md:grid-cols-[250px_1fr]"
      >
        <div className="hidden p-3 md:block">
          <img
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500&q=90"
            alt="Golf ball on bright green turf"
            className="h-full w-full rounded-[6px] object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center p-7 text-white">
          <span className="mb-5 w-fit rounded-full bg-white/25 px-3 py-1 text-[7px] font-bold uppercase text-white">
            Subscribe
          </span>
          <h3 className="max-w-[500px] font-[Poppins] text-[22px] font-normal leading-[1.05]">
            Teeing Up for Success: The Latest<br className="hidden md:block" />
            Golf News, Tips, and Trends!
          </h3>

          <form onSubmit={handleSubmit} className="mt-5 flex max-w-[310px] overflow-hidden rounded-full bg-black/15">
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[8px] text-white placeholder-white/80 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="m-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#d6ff31] text-black disabled:opacity-60"
            >
              {loading ? (
                <div className="h-3 w-3 animate-spin rounded-full border border-black/20 border-t-black" />
              ) : (
                <FiArrowRight className="h-3 w-3" />
              )}
            </button>
          </form>

          {status && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 text-[9px] ${status === 'success' ? 'text-lime-200' : 'text-red-200'}`}
            >
              {message}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
