import type { IconType } from 'react-icons';

interface SocialIconProps {
  label: string;
  href: string;
  icon: IconType;
  className?: string;
}

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

export default function SocialIcon({ label, href, icon: Icon, className }: SocialIconProps) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`group relative inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${className ?? ''}`}
    >
      <Icon
        aria-hidden
        size={21}
        className={`text-ink/70 transition-[transform_250ms_cubic-bezier(0.22,1,0.36,1),color_200ms_ease,filter_250ms_cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[5px] group-hover:scale-[1.04] group-hover:text-caramel group-hover:drop-shadow-[0_5px_10px_rgba(23,19,15,0.14)] ${EASE}`}
      />
    </a>
  );
}