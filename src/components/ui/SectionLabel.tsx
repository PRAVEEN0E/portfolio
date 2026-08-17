import type { ReactNode } from 'react';

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-caramel" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-caramel">
        {children}
      </span>
    </div>
  );
}