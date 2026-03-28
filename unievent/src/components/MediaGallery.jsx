import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const items = [
  { emoji: '🎤', title: 'Open Mic Night', sub: 'Fall 2025', gradient: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.2))' },
  { emoji: '🚀', title: 'Startup Pitch Day', sub: 'Fall 2025', gradient: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(16,185,129,0.2))' },
  { emoji: '🎨', title: 'Art Walk', sub: 'Winter 2025', gradient: 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(124,58,237,0.2))' },
  { emoji: '🏃', title: 'Inter-Uni Sports Fest', sub: 'Winter 2025', gradient: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(236,72,153,0.2))' },
  { emoji: '💻', title: 'Code Sprint 2025', sub: 'Fall 2025', gradient: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.2))' },
  { emoji: '🎶', title: 'Spring Gala Concert', sub: 'Spring 2025', gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(245,158,11,0.25))' },
];

export default function MediaGallery() {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  return (
    <section className="relative z-[1] py-24 bg-bg overflow-hidden" id="gallery">
      <div className="w-[90%] max-w-[1320px] mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-none">
            Event <em className="italic text-gradient">Gallery</em>
          </h2>
        </motion.div>
      </div>

      <div className="w-[90%] max-w-[1320px] mx-auto">
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="flex-none w-[320px] h-[420px] rounded-2xl overflow-hidden relative snap-start border border-white/[0.06] bg-bg-elevated"
    >
      {/* Gradient */}
      <div className="absolute inset-0 z-[1]" style={{ background: item.gradient }} />

      {/* Emoji */}
      <div className="absolute inset-0 flex items-center justify-center text-7xl z-0 opacity-70">
        {item.emoji}
      </div>

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-[2]" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9), transparent)' }}>
        <h4 className="text-lg font-bold mb-1">{item.title}</h4>
        <p className="text-sm text-zinc-300">{item.sub}</p>
      </div>
    </motion.div>
  );
}
