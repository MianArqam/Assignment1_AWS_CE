import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export default function RegistrationModal({ isOpen, onClose, eventName }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-8"
        >
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] bg-[rgba(18,18,26,0.92)] backdrop-blur-[40px] border border-violet/20 rounded-3xl p-10 relative"
          >
            {/* Glow ring */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet/30 via-cyan/15 to-violet/10 -z-10 blur-[1px]" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-white transition-all text-lg"
            >
              <HiX />
            </button>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-extrabold tracking-tight mb-2">Register Now</h3>
                <p className="text-sm text-zinc-300 mb-8">
                  Secure your spot for <strong className="text-white">{eventName || 'this event'}</strong>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="First Name" placeholder="John" required />
                    <FormField label="Last Name" placeholder="Doe" required />
                  </div>
                  <FormField label="University Email" type="email" placeholder="john.doe@university.edu" required />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Student ID" placeholder="2026001" required />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Department</label>
                      <select
                        required
                        className="py-3 px-4 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm outline-none transition-all focus:border-violet focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)] appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2371717a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          paddingRight: '2.5rem',
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>Select</option>
                        <option>Computer Science</option>
                        <option>Electrical Engineering</option>
                        <option>Business Administration</option>
                        <option>Fine Arts</option>
                        <option>Mechanical Engineering</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 bg-gradient-to-br from-violet to-violet-dim rounded-full text-sm font-bold uppercase tracking-wider text-white hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Confirm Registration
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                  <p className="text-center text-xs text-zinc-500 mt-1">
                    By registering you agree to our event participation guidelines.
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-[72px] h-[72px] mx-auto mb-6 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight mb-2">You're In!</h3>
                <p className="text-zinc-300 text-sm">
                  Registration confirmed. Check your email for event details and your unique QR pass.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({ label, type = 'text', placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="py-3 px-4 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm outline-none transition-all placeholder:text-zinc-500 focus:border-violet focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
      />
    </div>
  );
}
