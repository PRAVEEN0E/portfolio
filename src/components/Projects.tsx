import { useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SectionLabel from './ui/SectionLabel';
import ProjectCard from './ProjectCard';
import { projects } from '../data/content';

const CARD_GAP = 24;

function ProjectsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const computeActive = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + CARD_GAP;
    const index = Math.round(el.scrollLeft / stride);
    setActive(Math.max(0, Math.min(projects.length - 1, index)));
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    if (el.dataset.ticking) return;
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
    el.scrollTo({
      left: index * (card.offsetWidth + CARD_GAP),
      behavior: 'smooth',
    });
  };

  return (
    <div className="lg:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects carousel"
        tabIndex={0}
        className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60"
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            aria-label={`Slide ${i + 1} of ${projects.length}: ${project.title}`}
            className="w-[88vw] max-w-sm shrink-0 snap-center"
          >
            <ProjectCard project={project} large={i === 0} />
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
        Swipe to explore
        <FiArrowRight aria-hidden className="text-caramel" />
      </p>

      <div className="mt-5 flex items-center justify-center gap-2">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => scrollToCard(i)}
            aria-label={`Go to project ${i + 1}: ${project.title}`}
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

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Featured Work</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Things I&rsquo;ve
              <br />
              Built.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink-muted">
              A selection of products I&rsquo;ve designed, engineered and shipped — from
              marketplaces to academic platforms.
            </p>
          </Reveal>
        </div>

        {/* Mobile: swipe carousel */}
        <ProjectsCarousel />

        {/* Tablet + Desktop: existing editorial layout */}
        <div className="mt-24 hidden flex-col gap-24 lg:flex">
          <ProjectCard project={featured} large />
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}