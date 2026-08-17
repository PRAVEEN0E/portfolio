import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Reveal from './ui/Reveal';
import SectionLabel from './ui/SectionLabel';
import { EASE } from '../lib/motion';
import { experience } from '../data/content';

const bullets: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Experience</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              My Journey
              <br />
              <em className="text-caramel">So Far.</em>
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 max-w-3xl">
          {experience.map((entry) => (
            <div key={entry.company} className="relative pl-10">
              {/* Timeline line — draws downward */}
              <motion.span
                aria-hidden
                initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 1, ease: EASE }}
                style={{ transformOrigin: 'top' }}
                className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-caramel/60 via-line to-line"
              />

              {/* Marker — pops in */}
              <motion.span
                aria-hidden
                initial={reduce ? { scale: 1 } : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
                className="absolute left-0 top-2 h-3 w-3 -translate-x-[6.5px] rounded-full border-2 border-caramel bg-cream"
              />

              {/* Content */}
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-caramel">
                  {entry.period}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  {entry.role}
                </h3>
                <p className="mt-1.5 text-base text-ink-muted">{entry.company}</p>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ staggerChildren: 0.08, delayChildren: 0.7 }}
                  className="mt-7 space-y-3"
                >
                  {entry.points.map((point) => (
                    <motion.li
                      key={point}
                      variants={bullets}
                      className="flex items-start gap-4 text-[15px] leading-relaxed text-ink/80"
                    >
                      <span className="mt-[0.6em] h-px w-5 shrink-0 bg-caramel/70" />
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}