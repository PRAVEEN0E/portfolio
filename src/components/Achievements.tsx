import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { TbTrophy, TbCode, TbCertificate, TbBrain } from 'react-icons/tb';
import type { IconType } from 'react-icons';
import SectionLabel from './ui/SectionLabel';
import Reveal from './ui/Reveal';
import { EASE } from '../lib/motion';
import { achievements } from '../data/content';

const icons: IconType[] = [TbTrophy, TbCode, TbTrophy, TbCertificate, TbBrain];

const CARD_GAP = 24;

const revealCard: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

const contentStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const contentItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

function AchievementCard({
  achievement,
  index,
}: {
  achievement: (typeof achievements)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const Icon = icons[index % icons.length];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 180, damping: 20, mass: 0.2 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 6);
    my.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 6);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-8 shadow-soft transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[7px] hover:scale-[1.01] hover:border-caramel hover:shadow-lift sm:p-10"
    >
      <motion.div
        variants={revealCard}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-70px' }}
        transition={reduce ? { duration: 0.4 } : { delay: index * 0.1 }}
        className="h-full"
      >
        <motion.div
          variants={contentStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
          style={reduce ? undefined : { x: sx, y: sy }}
          className="flex h-full flex-col"
        >
          <motion.div variants={contentItem} className="flex items-start justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-cream text-caramel transition-[transform,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px] group-hover:scale-[1.05] group-hover:border-caramel/40">
              <Icon aria-hidden className="text-2xl" strokeWidth={1.25} />
            </span>
            <motion.span variants={contentItem} className="font-display text-sm text-ink-muted">
              {achievement.id}
            </motion.span>
          </motion.div>

          <motion.p
            variants={contentItem}
            className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-caramel"
          >
            {achievement.category}
          </motion.p>

          <motion.h3
            variants={contentItem}
            className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-caramel sm:text-3xl"
          >
            {achievement.title}
          </motion.h3>

          <motion.p variants={contentItem} className="mt-2 text-sm font-semibold text-ink/70">
            {achievement.subtitle}
          </motion.p>

          <motion.p variants={contentItem} className="mt-4 text-sm leading-relaxed text-ink-muted">
            {achievement.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </article>
  );
}

function AchievementsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const computeActive = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + CARD_GAP;
    setActive(Math.max(0, Math.min(achievements.length - 1, Math.round(el.scrollLeft / stride))));
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.dataset.ticking) return;
    el.dataset.ticking = 'true';
    requestAnimationFrame(() => {
      computeActive();
      if (el) delete el.dataset.ticking;
    });
  };

  const scrollToCard = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    el.scrollTo({ left: index * (card.offsetWidth + CARD_GAP), behavior: 'smooth' });
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Achievements carousel"
        tabIndex={0}
        className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60"
      >
        {achievements.map((a, i) => (
          <div
            key={a.id}
            aria-label={`Slide ${i + 1} of ${achievements.length}: ${a.title}`}
            className="w-[85vw] max-w-sm shrink-0 snap-center"
          >
            <AchievementCard achievement={a} index={i} />
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
        Swipe to explore
        <FiArrowRight aria-hidden className="text-caramel" />
      </p>

      <div className="mt-5 flex items-center justify-center gap-2">
        {achievements.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => scrollToCard(i)}
            aria-label={`Go to achievement ${i + 1}: ${a.title}`}
            aria-current={i === active}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
              i === active ? 'w-6 bg-caramel' : 'w-1.5 bg-ink/25 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="border-t border-line bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Achievements</SectionLabel>
        </Reveal>

        <div className="mt-10 sm:mt-14">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Milestones
              <br />
              <em className="text-caramel">Along the way.</em>
            </h2>
          </Reveal>
        </div>

        <AchievementsCarousel />

        <div className="mt-20 hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}