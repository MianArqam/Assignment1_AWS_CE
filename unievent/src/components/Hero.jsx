import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiSearch } from 'react-icons/hi';

const tags = ['Hackathons', 'Music Nights', 'Workshops', 'Sports', 'Art Exhibitions', 'Tech Talks', 'Career Fairs'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ keyword = '', onKeywordChange }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-[1]" id="hero">
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(6,182,212,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 50% 80%, rgba(124,58,237,0.08) 0%, transparent 50%)
          `,
          animation: 'gradientShift 12s ease-in-out infinite alternate',
        }}
      />

      <div ref={ref} className="relative z-[2] text-center max-w-[920px] px-8">
        {/* Eyebrow */}
        <motion.span
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="inline-block px-5 py-1.5 border border-violet/40 rounded-full text-xs font-semibold uppercase tracking-[0.12em] text-violet mb-8"
        >
          Spring Semester 2026
        </motion.span>

        {/* Title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.92] tracking-tighter mb-7"
        >
          <span className="block text-white">Where Campus</span>
          <span className="block text-gradient">Comes Alive</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-lg text-zinc-400 max-w-[540px] mx-auto mb-12 leading-relaxed"
        >
          Discover, register, and experience the most exciting campus events. From hackathons to art shows — all in one place.
        </motion.p>

        {/* Search bar */}
        <motion.div
          custom={3}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="relative max-w-[560px] mx-auto mb-12"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange?.(e.target.value)}
            placeholder="Search events, clubs, workshops..."
            className="w-full py-4 pl-12 pr-6 bg-white/[0.04] border border-violet/25 rounded-full text-white text-base outline-none transition-all duration-400 placeholder:text-zinc-500 focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.12),0_0_40px_rgba(124,58,237,0.35)] focus:bg-white/[0.06]"
          />
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg pointer-events-none" />
        </motion.div>

        {/* Tags */}
        <motion.div
          custom={4}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="flex flex-wrap gap-2.5 justify-center"
        >
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`px-4 py-2 bg-white/5 border border-white/[0.08] rounded-full text-sm font-medium text-zinc-300 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                i % 2 === 0
                  ? 'hover:bg-violet/15 hover:border-violet hover:text-white'
                  : 'hover:bg-cyan/12 hover:border-cyan hover:text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-zinc-500">Scroll</span>
        <div
          className="w-px h-10 bg-gradient-to-b from-violet to-transparent"
          style={{ animation: 'scrollPulse 2s infinite' }}
        />
      </div>
    </section>
  );
}
