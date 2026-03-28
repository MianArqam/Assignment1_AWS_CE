import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar({ onRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Featured', href: '#featured' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-violet/10 py-3'
          : 'py-5'
      }`}
    >
      <div className="w-[90%] max-w-[1320px] mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="text-xl font-extrabold tracking-tight flex items-center gap-0.5">
          <span className="text-violet">Uni</span>
          <span className="text-cyan">Event</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-medium text-zinc-400 uppercase tracking-widest hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet to-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={onRegister}
              className="px-6 py-2.5 bg-gradient-to-br from-violet to-cyan rounded-full text-xs font-bold uppercase tracking-wider text-white hover:shadow-[0_0_40px_rgba(124,58,237,0.35),0_0_40px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Register Now
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden z-[999]"
        >
          <button
            className="absolute top-5 right-6 text-white text-3xl"
            onClick={() => setMobileOpen(false)}
          >
            <HiX />
          </button>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-2xl font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onRegister(); }}
            className="px-8 py-3 bg-gradient-to-br from-violet to-cyan rounded-full text-sm font-bold uppercase tracking-wider text-white"
          >
            Register Now
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
