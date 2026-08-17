import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { scrollToHash, scrollToTop } from '../lib/scroll';
import SocialIcon from './ui/SocialIcon';
import { socials } from '../data/content';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  scrollToHash(href);
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-caramel hover:text-caramel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <FiArrowUp aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="bg-surface/60">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-caramel/30 to-transparent" />

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-5">
              <a
                href="#home"
                onClick={(e) => handleAnchor(e, '#home')}
                aria-label="Back to top of page"
                className="font-display text-3xl font-bold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Praveen<span className="text-caramel">.</span>
              </a>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Full Stack Developer
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
                Building scalable web applications, AI-powered systems and modern digital
                products.
              </p>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer quick links" className="lg:col-span-3">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-caramel">
                Explore
              </h2>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchor(e, link.href)}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink/80 transition-colors duration-200 hover:text-caramel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <span className="h-px w-3 bg-caramel/40 transition-all duration-200 group-hover:w-5 group-hover:bg-caramel" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div className="lg:col-span-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-caramel">
                Connect
              </h2>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {socials.map((s) => (
                  <SocialIcon
                    key={s.label}
                    label={s.label}
                    href={s.href}
                    icon={s.icon}
                    className="h-11 w-11 rounded-full border border-line bg-cream hover:border-caramel"
                  />
                ))}
              </div>

              <p className="mt-6 flex items-center gap-2.5 text-sm text-ink/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-caramel" />
                </span>
                Open to opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ink-muted sm:flex-row sm:px-8">
            <p>© 2026 Praveen Eswaramoorthi</p>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 font-semibold text-ink/80 transition-colors duration-200 hover:text-caramel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Back to top
              <FiArrowUpRight
                aria-hidden
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}