import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiLocationMarker, HiClock, HiUserGroup } from 'react-icons/hi';

export default function FeaturedEvent({ onRegister }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative z-[1] pt-8 pb-32 bg-bg" id="featured">
      <div className="w-[90%] max-w-[1320px] mx-auto">
        {/* Label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="w-12 h-px bg-gradient-to-r from-violet to-transparent" />
          <span className="text-xs uppercase tracking-[0.18em] font-semibold text-violet">Featured Event</span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          whileHover={{ y: -4, boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.35)' }}
          className="relative rounded-3xl overflow-hidden min-h-[520px] flex items-end border border-violet/15 transition-all duration-600"
          style={{ background: 'linear-gradient(135deg, #1a1030 0%, #0d1520 100%)' }}
        >
          {/* BG gradients */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse at 70% 20%, rgba(124,58,237,0.25) 0%, transparent 50%),
                radial-gradient(ellipse at 30% 80%, rgba(6,182,212,0.15) 0%, transparent 50%)
              `,
            }}
          />

          {/* Badge */}
          <div className="absolute top-8 left-8 z-[2] px-5 py-2 bg-gradient-to-br from-violet to-cyan rounded-full text-[0.7rem] font-bold uppercase tracking-wider">
            Featured
          </div>

          {/* Date float */}
          <div className="absolute top-8 right-8 z-[2] text-right hidden sm:block">
            <span className="block text-6xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">28</span>
            <span className="text-sm uppercase tracking-widest text-zinc-300">Mar 2026</span>
          </div>

          {/* Content */}
          <div
            className="relative z-[2] p-8 md:p-14 w-full"
            style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 60%, transparent 100%)' }}
          >
            <h2 className="text-[clamp(2rem,4.5vw,3.8rem)] font-black leading-none tracking-tight mb-4">
              Nexus Hackathon<br />2026
            </h2>
            <p className="text-base text-zinc-300 max-w-[600px] mb-8 leading-relaxed">
              48 hours. 200+ developers. One mission — build the future. Join the largest student-run hackathon this spring and compete for $10K in prizes.
            </p>

            {/* Meta */}
            <div className="flex items-center gap-6 md:gap-8 mb-8 flex-wrap">
              <MetaItem icon={<HiLocationMarker />} text="Innovation Center, Building 14" />
              <MetaItem icon={<HiClock />} text="48-Hour Marathon" />
              <MetaItem icon={<HiUserGroup />} text="142 / 200 Spots" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => onRegister('Nexus Hackathon 2026')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-violet to-violet-dim rounded-full text-sm font-bold uppercase tracking-wider text-white hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Register Now
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-zinc-700 rounded-full text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:border-cyan hover:text-cyan transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetaItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-300">
      <div className="w-8 h-8 rounded-lg bg-violet/15 flex items-center justify-center text-violet text-sm">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}
