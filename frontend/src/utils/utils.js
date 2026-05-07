import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getLevelStyles = (level) => {
  const styles = {
    Beginner: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
    },
    Intermediate: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
    },
    Advanced: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
    },
  };

  return (
    styles[level] || {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
    }
  );
};
