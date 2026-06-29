import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '../animations/variants';

export default function Hero() {
  const heroRef = useRef(null);
  const ballRef = useRef(null);
  const bgRef = useRef(null);

  // GSAP parallax + floating ball
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating golf ball animation
      gsap.to(ballRef.current, {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[560px] lg:min-h-[600px]"
        >
          {/* Background Image */}
          <div
            ref={bgRef}
            className="absolute inset-0 scale-[1.30]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1400&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Optional subtle overlay removed to keep the grass image natural */}
          <div className="absolute inset-0 bg-black/15" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full min-h-[500px] md:min-h-[560px] lg:min-h-[600px] p-8 md:p-12 lg:p-16">
            {/* Left Content */}
            <div className="flex-1 max-w-lg">
              <motion.h1
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-[Poppins] mb-6"
              >
                Tee off in{' '}
                <span className="text-green-300">Perfect</span>
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 btn-ripple">
                  LEARN MORE
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all duration-300 btn-ripple">
                  BOOK A TIME
                </button>
              </motion.div>
            </div>

            {/* Center Golf Ball */}
            <div className="flex-shrink-0 my-8 lg:my-0">
              <motion.div
                ref={ballRef}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80"
                  alt="Golf ball on tee at sunset"
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-4 border-white/30"
                  loading="eager"
                />
              </motion.div>
            </div>

            {/* Right Description */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="flex-1 max-w-xs text-right hidden lg:block"
            >
              <p className="text-white/90 text-sm leading-relaxed">
                Golf requires skill, strategy, and mental focus, and is enjoyed both competitively and recreationally.
              </p>
            </motion.div>
          </div>

          {/* Floating Promo Card */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12 glass rounded-2xl p-4 max-w-[220px] hidden md:block"
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1592919505780-303950717480?w=200&q=80"
                  alt="Golf course aerial view"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold leading-tight">Offer A Great Golf</h4>
                <p className="text-white/70 text-[10px] mt-1 leading-relaxed">
                  Played on expansive outdoor courses, the game emphasizes skill, strategy, and accuracy.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
