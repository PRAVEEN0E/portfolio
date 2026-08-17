import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Reveal from './ui/Reveal';
import SectionLabel from './ui/SectionLabel';
import { EASE } from '../lib/motion';

const metrics = [
  { value: '15+', label: 'Projects Built' },
  { value: '2+', label: 'Years Learning & Building' },
  { value: '2+', label: 'Hackathons Participated' },
];

const statReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function About() {
  return (
    <section id="about" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>About Me</SectionLabel>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                I enjoy turning ideas
                <br />
                into{' '}
                <em className="text-caramel">
                  real&nbsp;products<span className="text-outline-caramel">.</span>
                </em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pl-12">
            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-ink-muted">
                I&rsquo;m a Full Stack Developer focused on real-world applications — from
                the first wireframe to the final deployment. I care about clean
                architecture and scalable systems, and I obsess over the small details
                that make an interface feel right.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                My work sits at the intersection of engineering and product design:
                building user-focused interfaces backed by reliable, well-structured
                services that are a pleasure to maintain.
              </p>
            </Reveal>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
          transition={{ staggerChildren: 0.12 }}
          className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-8"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={statReveal}
              className="sm:border-l sm:border-line sm:pl-8 first:sm:border-l-0 first:sm:pl-0"
            >
              <span className="font-display text-5xl font-semibold text-caramel">
                {m.value}
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}