import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Project } from '../data/content';
import RevealMedia from './ui/RevealMedia';
import { EASE } from '../lib/motion';

const textStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface ProjectCardProps {
  project: Project;
  large?: boolean;
  reverse?: boolean;
}

function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 transition-transform duration-[450ms] ease-out group-hover:scale-[1.025] sm:p-9">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted/80">
          Case Study — {project.id}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute -right-2 -top-16 select-none font-display text-[9rem] font-bold leading-none text-ink/[0.045] sm:-right-6 sm:text-[13rem]">
          {project.id}
        </span>
        <span className="block font-display text-4xl font-semibold text-ink sm:text-6xl">
          {project.title}
        </span>
        <span className="text-outline-caramel mt-2 block font-display text-2xl sm:text-3xl">
          {project.id} — Full Stack
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-caramel/60" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted/80">
          {project.technologies.slice(0, 3).join(' · ')}
        </span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, large, reverse }: ProjectCardProps) {
  return (
    <div
      className={`group grid w-full shrink-0 snap-center items-center gap-8 lg:w-auto lg:max-w-none lg:grid lg:gap-16 ${
        large ? 'lg:grid-cols-12' : 'lg:grid-cols-2'
      }`}
    >
      {/* Visual */}
      <div className={`relative ${large ? 'lg:col-span-7' : ''} ${reverse ? 'lg:order-2' : ''}`}>
        <RevealMedia>
          <div
            data-cursor="project"
            className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-line bg-beige"
          >
            <ProjectCover project={project} />

            <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.05]" />

            <span
              aria-hidden
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-sm text-ink/60 transition-all duration-[450ms] ease-out group-hover:-rotate-45 group-hover:border-caramel group-hover:text-caramel"
            >
              ↗
            </span>
          </div>
        </RevealMedia>
      </div>

      {/* Text */}
      <div className={`${large ? 'lg:col-span-5' : ''} ${reverse ? 'lg:order-1' : ''}`}>
        <motion.div
          variants={textStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
        >
          <motion.div variants={textItem} className="flex items-baseline gap-4">
            <span className="font-display text-sm font-semibold text-caramel">{project.id}</span>
            <span className="h-px flex-1 bg-line" />
          </motion.div>

          <motion.h3
            variants={textItem}
            className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight transition-[color,transform] duration-[450ms] ease-out group-hover:-translate-y-0.5 group-hover:text-caramel sm:text-4xl lg:text-5xl"
          >
            {project.title}
          </motion.h3>

          <motion.p variants={textItem} className="mt-5 max-w-md leading-relaxed text-ink-muted">
            {project.description}
          </motion.p>

          <motion.div variants={textItem} className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div variants={textItem} className="mt-9 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="group/live inline-flex items-center gap-2.5 rounded-full bg-caramel px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-cream shadow-soft transition-all duration-300 hover:bg-caramel-hover active:scale-[0.96]"
              >
                Live Demo
                <FiArrowUpRight
                  aria-hidden
                  className="transition-all duration-300 group-hover/live:translate-x-1.5 group-hover/live:-translate-y-0.5"
                />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="group/gh inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:border-caramel hover:text-caramel active:scale-[0.96]"
              >
                <FiGithub aria-hidden className="text-sm" />
                GitHub
                <FiArrowUpRight
                  aria-hidden
                  className="transition-all duration-300 group-hover/gh:translate-x-1.5 group-hover/gh:-translate-y-0.5"
                />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}