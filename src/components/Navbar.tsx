import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { scrollToHash } from '../lib/scroll';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => window.__lenis?.start();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled || open
            ? 'border-b border-line/70 bg-cream/85 py-3 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go('#home');
            }}
            className="font-display text-2xl font-bold tracking-tight"
          >
            Praveen<span className="text-caramel">.</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={`link-underline relative text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? 'text-caramel' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-caramel transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download="Praveen_Eswaramoorthi_Resume.pdf"
              data-cursor="button"
              className="link-underline hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-ink sm:inline-flex"
            >
              Resume ↓
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-surface lg:hidden"
            >
              <span
                className={`h-px w-4 bg-ink transition-transform duration-300 ${
                  open ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-4 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-px w-4 bg-ink transition-transform duration-300 ${
                  open ? '-translate-y-[9px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-cream lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-24 pb-10">
              {links.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-caramel">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-4xl leading-none transition-colors sm:text-5xl ${
                        isActive ? 'text-caramel' : 'text-ink'
                      }`}
                    >
                      {link.label}
                    </span>
                  </motion.a>
                );
              })}
              <motion.a
                href="/resume.pdf"
                download="Praveen_Eswaramoorthi_Resume.pdf"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 py-6 font-display text-2xl text-ink"
              >
                Resume
                <FiArrowUpRight aria-hidden className="text-caramel" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}