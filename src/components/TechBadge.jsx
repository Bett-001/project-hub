import { cn } from '@/lib/utils';

// interface removed
  tech;
  size?: 'sm' | 'md';
}

const techColors<TechStack, string> = {
  React: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  Python: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Flask: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  Android: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Fullstack: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Node.js': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  PostgreSQL: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  MongoDB: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export function TechBadge({ tech, size = 'sm' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        techColors[tech] || 'bg-secondary text-secondary-foreground',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      )}
    >
      {tech}
    </span>
  );
}
