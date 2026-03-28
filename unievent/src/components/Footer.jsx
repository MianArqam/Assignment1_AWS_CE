import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const platformLinks = ['Browse Events', 'My Registrations', 'Host an Event', 'Calendar'];
const uniLinks = ['Campus Map', 'Student Portal', 'Clubs Directory', 'Contact Us'];
const legalLinks = ['Privacy Policy', 'Terms of Use', 'Accessibility'];

export default function Footer() {
  return (
    <footer className="relative z-[1] pt-20 pb-10 bg-bg border-t border-white/[0.04]">
      <div className="w-[90%] max-w-[1320px] mx-auto">
        {/* Top */}
        <div className="flex justify-between items-start flex-wrap gap-12 pb-12 border-b border-white/[0.06] mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-2">
              <span className="text-violet">Uni</span>
              <span className="text-cyan">Event</span>
            </h3>
            <p className="text-sm text-zinc-500 max-w-[300px] leading-relaxed">
              The official event management platform of the university. Connecting students, clubs, and experiences since 2024.
            </p>
          </div>

          {/* Link groups */}
          <div className="flex gap-16 flex-wrap">
            <FooterCol title="Platform" links={platformLinks} />
            <FooterCol title="University" links={uniLinks} />
            <FooterCol title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-xs text-zinc-500">&copy; 2026 UniEvent. All rights reserved. Built with purpose.</p>
          <div className="flex gap-3">
            <SocialIcon icon={<FaXTwitter />} label="Twitter" />
            <SocialIcon icon={<FaInstagram />} label="Instagram" />
            <SocialIcon icon={<FaLinkedinIn />} label="LinkedIn" />
            <SocialIcon icon={<FaYoutube />} label="YouTube" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-[0.7rem] uppercase tracking-[0.15em] text-zinc-500 font-semibold mb-4">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-sm text-zinc-300 hover:border-violet hover:text-violet hover:bg-violet/10 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
