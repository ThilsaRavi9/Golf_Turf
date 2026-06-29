import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';
import { pageTransition, fadeInUp, fadeInLeft, fadeInRight } from '../animations/variants';
import { submitContact } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await submitContact(form);
      setStatus({ type: 'success', msg: 'Message sent successfully! We\'ll get back to you soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error || 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main {...pageTransition} className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-[Poppins] mt-2">
            Contact Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            Have questions about our courses, membership, or events? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Address</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">123 Golf Course Drive, Green Valley, CA 90210</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Phone</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Email</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">hello@springgolf.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🕐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Hours</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Mon - Sun: 6AM - 8PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] img-zoom">
              <img
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80"
                alt="Golf course aerial view"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 dark:text-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 dark:text-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 dark:text-white transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 dark:text-white transition-all resize-none"
                  />
                </div>
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl text-sm ${
                    status.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  }`}
                >
                  {status.msg}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 btn-ripple disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
