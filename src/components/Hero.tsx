import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Magnetic from './ui/Magnetic';
import SocialIcon from './ui/SocialIcon';
import { scrollToHash } from '../lib/scroll';
import { EASE, fadeUpAt, lineAt, staggerContainer } from '../lib/motion';
import { socials } from '../data/content';

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {socials.map((s) => (
        <SocialIcon key={s.label} label={s.label} href={s.href} icon={s.icon} />
      ))}
    </div>
  );
}

function MaskedLine({
  children,
  variants,
  className,
}: {
  children: React.ReactNode;
  variants: Variants;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        variants={variants}
        className="block will-change-transform"
        initial={reduce ? { y: 0 } : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cursorX = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const cursorY = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  const onPortraitMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  const onPortraitLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="home" className="relative overflow-hidden pb-14 pt-28 sm:pb-24 sm:pt-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Oversized name */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="pointer-events-none relative z-20"
        >
          <motion.p
            variants={fadeUpAt(0.15)}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-caramel sm:mb-4"
          >
            Hi, I&rsquo;m
          </motion.p>
          <h1
            data-cursor="type"
            className="group pointer-events-auto font-display font-bold leading-[0.85] tracking-[-0.03em] text-ink sm:leading-[0.95] sm:tracking-[-0.01em]"
          >
            <MaskedLine variants={lineAt(0.3)}>
              <span className="block text-[clamp(2.4rem,11.5vw,8rem)] transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                PRAVEEN
              </span>
            </MaskedLine>
            <MaskedLine variants={lineAt(0.42)}>
              <span className="text-outline-caramel block text-[clamp(2rem,9.5vw,7.5rem)] transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                ESWARAMOORTHI
              </span>
            </MaskedLine>
          </h1>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-14 sm:mt-8 sm:gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Role, description, CTAs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="z-10 lg:col-span-7"
          >
            <motion.div variants={fadeUpAt(0.5)} className="flex items-center gap-4">
              <span className="h-px w-10 bg-caramel sm:w-12" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/60">
                Full Stack Developer
              </span>
              <span className="hidden h-px flex-1 bg-line sm:block" />
            </motion.div>

            <motion.p
              variants={fadeUpAt(0.65)}
              className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-7 sm:text-xl"
            >
              I build scalable, user-focused web applications with clean architecture and
              modern technologies.
            </motion.p>

            <motion.div
              variants={fadeUpAt(0.8)}
              className="mt-7 flex flex-col items-stretch gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash('#projects');
                  }}
                  data-cursor="button"
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-caramel px-8 py-4 text-sm font-semibold text-cream shadow-soft transition-all duration-300 hover:bg-caramel-hover group-hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:justify-center"
                >
                  View My Work
                  <FiArrowUpRight
                    aria-hidden
                    className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash('#contact');
                  }}
                  data-cursor="button"
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-full border border-ink/20 bg-surface px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:border-caramel hover:text-caramel group-hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:justify-center"
                >
                  Let&rsquo;s Connect
                  <FiArrowUpRight
                    aria-hidden
                    className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
            </motion.div>

            {/* Socials — desktop only (inside left column) */}
<motion.div variants={fadeUpAt(0.95)}>
              <SocialLinks className="mt-16 hidden flex-wrap items-center gap-x-8 gap-y-3 lg:flex" />
            </motion.div>
          </motion.div>

          {/* Portrait — blended into the composition, not a card */}
          <div
            ref={portraitRef}
            className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none lg:-mt-52"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
              style={{ y: parallaxY }}
              className="relative"
            >
              {/* Lift + parallax portrait */}
              <div className="relative transition-[transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.015] hover:drop-shadow-[0_20px_45px_rgba(23,19,15,0.14)]">
                <motion.div
                  onMouseMove={onPortraitMove}
                  onMouseLeave={onPortraitLeave}
                  data-cursor="media"
                  style={{ x: cursorX, y: cursorY }}
                  className="relative aspect-[4/5]"
                >
                  <img
                    src="/profolio pic.png"
                    alt="Portrait of Praveen Eswaramoorthi"
                    loading="lazy"
                    className="mask-portrait absolute inset-0 h-full w-full object-cover object-[50%_15%] grayscale-[0.5] sepia-[0.35] contrast-[1.02] brightness-[1.02]"
                  />
                </motion.div>
              </div>

              {/* Minimal print marks — desktop only */}
              <div aria-hidden className="absolute -left-4 top-8 hidden items-center gap-2.5 sm:flex">
                <span className="h-2 w-2 rounded-full border border-caramel/60" />
                <span className="h-px w-10 bg-caramel/50" />
              </div>
              <div aria-hidden className="absolute -right-1 bottom-16 hidden select-none font-display text-2xl leading-none text-caramel/40 sm:block">
                +
              </div>

              {/* Handwritten annotation */}
              <div className="absolute -top-3 left-0 -rotate-6 rounded-sm bg-cream/80 px-3 py-1.5 font-script text-lg leading-snug text-caramel sm:-left-8 sm:text-xl">
                Building products
                <br />
                that solve real
                <br />
                problems.
              </div>

              {/* Availability card */}
              <div className="absolute -bottom-8 left-0 rounded-2xl border border-line bg-surface px-6 py-5 shadow-soft sm:-left-8">
                <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/70">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-caramel" />
                  </span>
                  Available for
                </p>
                <p className="mt-2 font-display text-base sm:text-lg">
                  Freelance Projects · Full-time
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Socials — mobile only (below portrait) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-9 lg:hidden"
        >
          <motion.div variants={fadeUpAt(0.95)}>
            <SocialLinks className="flex flex-wrap items-center gap-x-6 gap-y-3" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}