import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import type { IconType } from 'react-icons';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'TalentNest',
    description:
      'A full-stack freelance marketplace connecting clients with talented professionals.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Fastify',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Socket.IO',
    ],
    githubUrl: 'https://github.com/Talent-nest-in/TalentNest',
    liveUrl: 'https://jointalentnest.vercel.app/',
    featured: true,
  },
  {
    id: '02',
    title: 'Smart No-Due Clearance',
    description:
      'An automated no-due clearance and hall-ticket generation system for colleges.',
    technologies: ['React', 'TypeScript', 'Fastify', 'PostgreSQL', 'Prisma', 'JWT', 'Excel', 'Puppeteer'],
    githubUrl: 'https://github.com/PRAVEEN0E/Smart_no_due_clearance',
    liveUrl: 'https://smart-no-due-clearance.vercel.app/',
  },
  {
    id: '03',
    title: 'Product API',
    description:
      'A RESTful product management API for creating, reading, updating, and deleting product data.',
    technologies: ['Node.js', 'Express.js', 'REST API'],
    githubUrl: 'https://github.com/PRAVEEN0E/Rest_api',
    liveUrl: 'https://productlist-api.onrender.com/',
  },
];

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Backend Developer Intern',
    company: 'Chan Tech · Erode',
    period: 'Jan 2026 — Apr 2026',
    points: [
      'Built RESTful APIs using Node.js and Fastify',
      'Integrated PostgreSQL with Prisma ORM',
      'Implemented authentication and role-based access',
      'Worked on production deployments',
      'Maintained backend services',
    ],
  },
];

export interface Achievement {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    id: '01',
    category: 'Hackathon',
    title: 'Smart India Hackathon 2025',
    subtitle: 'SIH 2025',
    description:
      'Participated in Smart India Hackathon 2025, working on a real-world problem-solving challenge as part of a team.',
  },
  {
    id: '02',
    category: 'Hackathon',
    title: '48-Hour Hackathon',
    subtitle: 'VIT Vellore',
    description:
      'Participated in a 48-hour hackathon at VIT Vellore, building and developing a solution under a time-constrained environment.',
  },
  {
    id: '03',
    category: 'Achievement',
    title: 'Inter-Department Events',
    subtitle: 'Prize Winner',
    description: 'Won prizes in inter-department events.',
  },
  {
    id: '04',
    category: 'Certification',
    title: 'Java Certification',
    subtitle: 'Infosys Springboard',
    description:
      'Successfully completed a Java certification through Infosys Springboard.',
  },
  {
    id: '05',
    category: 'Certification',
    title: 'Intro to Deep Learning',
    subtitle: 'Kaggle',
    description:
      'Successfully completed the Intro to Deep Learning course/certification on Kaggle.',
  },
];

export const socials: { label: string; href: string; icon: IconType }[] = [
  { label: 'GitHub', href: 'https://github.com/PRAVEEN0E', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/praveeneswaramoorthi/', icon: FiLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: FiInstagram },
  { label: 'Email', href: 'mailto:praveeneswaramoorthi08@gmail.com', icon: FiMail },
];