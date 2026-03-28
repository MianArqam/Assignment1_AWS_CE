import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useEvents from '../hooks/useEvents';

const cityFilters = ['All', 'New York', 'Los Angeles', 'Chicago'];

const cardLayouts = [
  {
    span: 'col-span-12 md:col-span-7 row-span-2',
    bg: 'radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.3), transparent 70%)',
    catColor: 'violet',
    titleSize: 'text-2xl md:text-4xl',
  },
  {
    span: 'col-span-12 md:col-span-5',
    bg: 'radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.25), transparent 70%)',
    catColor: 'cyan',
    titleSize: 'text-xl md:text-2xl',
  },
  {
    span: 'col-span-12 md:col-span-5',
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(236,72,153,0.2), transparent 70%)',
    catColor: 'violet',
    titleSize: 'text-xl md:text-2xl',
  },
  {
    span: 'col-span-12 md:col-span-4 row-span-2',
    bg: 'radial-gradient(ellipse at 40% 70%, rgba(124,58,237,0.25), transparent 65%)',
    catColor: 'cyan',
    titleSize: 'text-xl md:text-2xl',
  },
  {
    span: 'col-span-12 md:col-span-4',
    bg: 'radial-gradient(ellipse at 60% 30%, rgba(6,182,212,0.2), transparent 65%)',
    catColor: 'violet',
    titleSize: 'text-xl md:text-2xl',
  },
  {
    span: 'col-span-12 md:col-span-4',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.15), transparent 65%)',
    catColor: 'cyan',
    titleSize: 'text-xl md:text-2xl',
  },
];

function formatDate(rawDate) {
  if (!rawDate) return 'Date TBA';
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return rawDate;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function getCategory(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('music') || lowerTitle.includes('concert')) return 'Music';
  if (lowerTitle.includes('hack') || lowerTitle.includes('tech') || lowerTitle.includes('ai')) return 'Tech';
  if (lowerTitle.includes('sport') || lowerTitle.includes('marathon')) return 'Sports';
  if (lowerTitle.includes('art') || lowerTitle.includes('gallery')) return 'Arts';
  if (lowerTitle.includes('career') || lowerTitle.includes('job') || lowerTitle.includes('fair')) return 'Career';
  if (lowerTitle.includes('workshop') || lowerTitle.includes('bootcamp')) return 'Workshop';
  return 'Event';
}

function useDebouncedValue(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}

export default function EventListings({ onRegister, keyword = '' }) {
  const [activeCity, setActiveCity] = useState('All');
  const debouncedKeyword = useDebouncedValue(keyword, 500);
  const city = activeCity === 'All' ? '' : activeCity;
  const { events, loading, error } = useEvents({
    city,
    keyword: debouncedKeyword,
    size: 6,
    countryCode: 'US',
  });

  const cards = useMemo(
    () =>
      events.map((event, index) => {
        const layout = cardLayouts[index % cardLayouts.length];
        return {
          ...event,
          ...layout,
          category: getCategory(event.title),
          dateLabel: formatDate(event.date),
          location: `${event.venue}${event.city ? `, ${event.city}` : ''}`,
        };
      }),
    [events]
  );

  return (
    <section className="relative z-[1] py-16 pb-32 bg-bg-elevated" id="events">
      <div className="w-[90%] max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-none">
            Upcoming <em className="italic text-gradient">Events</em>
          </h2>
          <div className="flex gap-2 flex-wrap">
            {cityFilters.map((filterCity) => (
              <button
                key={filterCity}
                onClick={() => setActiveCity(filterCity)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeCity === filterCity
                    ? 'bg-violet border-violet text-white'
                    : 'border-zinc-700 text-zinc-300 hover:bg-violet/20 hover:border-violet/50'
                }`}
              >
                {filterCity}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 auto-rows-[minmax(180px,auto)] gap-5">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} index={i} />
          ))}

          {!loading && error && (
            <MessageCard
              title="Couldn’t load events"
              description={error}
            />
          )}

          {!loading && !error && cards.length === 0 && (
            <MessageCard
              title="No events found"
              description="Try a different keyword or city to discover more events."
            />
          )}

          {!loading && !error && cards.map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i} onRegister={onRegister} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index, onRegister }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={(el) => { cardRef.current = el; ref(el); }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'box-shadow 0.4s, border-color 0.4s',
      }}
      className={`${event.span} relative rounded-2xl overflow-hidden glass p-8 flex flex-col justify-end cursor-pointer group hover:border-violet/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(124,58,237,0.15)]`}
    >
      {/* BG */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
          event.image
            ? 'opacity-90 group-hover:opacity-100'
            : 'opacity-40 group-hover:opacity-70'
        }`}
        style={
          event.image
            ? {
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.48) 45%, rgba(0, 0, 0, 0.2) 100%), ${event.bg}, url(${event.image})`,
                backgroundSize: 'cover, cover, cover',
                backgroundPosition: 'center, center, center',
                backgroundRepeat: 'no-repeat',
              }
            : { background: event.bg }
        }
      />

      {/* Content */}
      <div className="relative z-[2]">
        <span
          className={`inline-block px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider mb-4 border ${
            event.catColor === 'cyan'
              ? 'bg-cyan/15 text-cyan border-cyan/25'
              : 'bg-violet/20 text-violet border-violet/25'
          }`}
        >
          {event.category}
        </span>
        {event.url ? (
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <h3 className={`${event.titleSize} font-extrabold tracking-tight leading-tight mb-3 whitespace-pre-line hover:text-violet transition-colors duration-300`}>
              {event.title}
            </h3>
          </a>
        ) : (
          <h3 className={`${event.titleSize} font-extrabold tracking-tight leading-tight mb-3 whitespace-pre-line`}>
            {event.title}
          </h3>
        )}
        <p className="text-sm text-zinc-300 mb-1">{event.dateLabel}</p>
        <p className="text-xs text-zinc-500">{event.location}</p>
        <button
          onClick={() => onRegister(event.title.replace('\n', ' '))}
          className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-violet/15 border border-violet/30 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-violet hover:border-violet hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all duration-300"
        >
          Register <span>&rarr;</span>
        </button>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ index }) {
  const layout = cardLayouts[index % cardLayouts.length];
  return (
    <div className={`${layout.span} rounded-2xl glass p-8 animate-pulse`}>
      <div className="w-20 h-6 rounded-full bg-white/10 mb-4" />
      <div className="w-3/4 h-8 rounded bg-white/10 mb-3" />
      <div className="w-2/3 h-4 rounded bg-white/10 mb-2" />
      <div className="w-1/2 h-3 rounded bg-white/10" />
      <div className="w-28 h-9 rounded-full bg-violet/20 mt-6" />
    </div>
  );
}

function MessageCard({ title, description }) {
  return (
    <div className="col-span-12 rounded-2xl glass p-10 text-center border border-zinc-700/60">
      <h3 className="text-2xl font-extrabold tracking-tight mb-3">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}
