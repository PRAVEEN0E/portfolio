import {
  TbLayoutGrid,
  TbServer,
  TbDatabase,
  TbRocket,
  TbTools,
} from 'react-icons/tb';
import type { IconType } from 'react-icons';
import Reveal from './ui/Reveal';
import SectionLabel from './ui/SectionLabel';

interface Category {
  label: string;
  icon: IconType;
  items: string[];
}

const categories: Category[] = [
  { label: 'Frontend', icon: TbLayoutGrid, items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Zustand'] },
  { label: 'Backend', icon: TbServer, items: ['Node.js', 'Fastify', 'REST APIs', 'WebSockets'] },
  { label: 'Database', icon: TbDatabase, items: ['PostgreSQL', 'Prisma', 'Redis'] },
  { label: 'DevOps', icon: TbRocket, items: ['Docker', 'GitHub Actions', 'Render', 'Vercel', 'Nginx'] },
  { label: 'Tools', icon: TbTools, items: ['Git', 'VS Code', 'Postman', 'Figma', 'Monaco Editor'] },
];

export default function TechStack() {
  return (
    <section id="skills" className="border-t border-line bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>Skills</SectionLabel>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              My Stack,
              <br />
              <em className="text-caramel">editorially</em> organised.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink-muted">
              The technologies I reach for when I need something reliable, expressive and
              maintainable.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.label} delay={i * 0.08}>
                <div className="group flex items-center gap-2.5">
                  <Icon
                    aria-hidden
                    className="text-lg text-caramel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-caramel transition-colors duration-300 group-hover:text-caramel-hover">
                    {cat.label}
                  </span>
                </div>
                <ul className="mt-5 border-t border-line pt-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-line/50 py-3 transition-all duration-300 hover:translate-x-1 hover:border-caramel/40"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-caramel/70 transition-all duration-300 group-hover:scale-125" />
                      <span className="text-base text-ink/80 transition-colors duration-300 group-hover:text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}