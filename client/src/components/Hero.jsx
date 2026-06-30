import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight } from '../animations/variants';

export default function Hero() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative min-h-[420px] overflow-hidden rounded-b-[10px] rounded-t-[6px] sm:min-h-[470px] lg:min-h-[520px]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1400&q=90')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 48%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-black/25" />

          <div className="relative z-10 min-h-[420px] p-6 sm:min-h-[470px] sm:p-8 lg:min-h-[520px]">
            <div className="flex items-start justify-between gap-8">
              <motion.h1
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="max-w-[330px] font-[Poppins] text-[36px] font-medium leading-[1.05] text-white sm:text-[44px] lg:text-[52px]"
              >
                Tee off in Perfect
              </motion.h1>

              <motion.div
                variants={fadeInRight}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="hidden max-w-[255px] pt-5 text-right md:block"
              >
                <div className="mb-3 ml-auto h-px w-20 bg-white/80" />
                <p className="text-[12px] font-medium leading-[1.2] text-white">
                  Golf requires skill, strategy, and mental focus, and is enjoyed both competitively and recreationally.
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button className="rounded-full bg-white px-5 py-2 text-[9px] font-bold text-black">
                    LEARN MORE
                  </button>
                  <button className="rounded-full bg-[#d5ff34] px-5 py-2 text-[9px] font-bold text-black">
                    BOOK A TIME
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="absolute bottom-7 left-6 font-[Poppins] text-[54px] font-light leading-none tracking-normal text-white sm:left-[190px] sm:text-[78px] lg:left-[240px] lg:text-[104px]"
            >
              Surroundings
            </motion.h2>
          </div>

          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="glass absolute bottom-10 left-8 hidden max-w-[178px] rounded-[8px] p-2 md:block"
          >
            <div>
              <div className="h-[74px] overflow-hidden rounded-[4px]">
                <img
                  src="https://images.unsplash.com/photo-1592919505780-303950717480?w=200&q=80"
                  alt="Golf course aerial view"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pt-2">
                <h4 className="text-[11px] font-bold leading-tight text-white">Offer A Great Golf</h4>
                <p className="mt-1 text-[7px] leading-tight text-white/80">
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
