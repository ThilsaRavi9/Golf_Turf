import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { fadeInLeft, fadeInRight, fadeInUp } from '../animations/variants';

const categories = ['Membership', 'Training', 'Coaching', 'Tournaments'];

export default function Instructor() {
  return (
    <section id="instructor" className="px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mb-12 max-w-[620px] text-center"
        >
          <p className="text-[16px] leading-[1.25] text-black">
            <span className="font-bold">Professional maintenance and operation</span> of golf courses, ensuring<br className="hidden md:block" />
            optimal playing conditions, landscaping, professionals and<br className="hidden md:block" />
            sustainability practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex min-h-[220px] flex-col justify-between rounded-[8px] bg-[#f3f8fb] p-6"
          >
            <div>
              <div className="mb-9 flex w-fit items-center gap-1.5 rounded-full bg-lime-200 px-2 py-1">
                <span className="flex -space-x-1">
                  {[0, 1, 2, 3].map(item => (
                    <span key={item} className="h-4 w-4 rounded-full border border-white bg-green-700" />
                  ))}
                </span>
                <span className="text-[7px] font-bold text-black">30k</span>
              </div>

              <h3 className="max-w-[280px] font-[Poppins] text-[24px] font-normal leading-[1.02] text-black">
                We Have <span className="font-bold">The Best<br />
                Instructors</span> To Teach You<br />
                Golfing mates.
              </h3>

              <p className="mt-4 max-w-[265px] text-[8px] leading-[1.4] text-gray-700">
                Golf requires skill, strategy, and mental focus, and is enjoyed both competitively and recreationally.
              </p>
            </div>

            <button className="mt-5 flex w-fit items-center gap-1.5 rounded-full bg-[#151515] px-3 py-2 text-[7px] font-bold uppercase text-white">
              Explore More
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
                <FiArrowUpRight className="h-2.5 w-2.5" />
              </span>
            </button>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative min-h-[220px] overflow-hidden rounded-[8px] img-zoom"
          >
            <img
              src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=900&q=90"
              alt="Aerial view of a golf course"
              className="h-full min-h-[220px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
              {categories.map(category => (
                <span key={category} className="rounded-full bg-white/40 px-3 py-1 text-[6px] font-bold uppercase text-white">
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
