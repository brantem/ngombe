import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

/* c8 ignore next 3 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calcPercentage = (a: number, b: number) => {
  if (a === 0 || b === 0) return 0;
  return Math.round((a / b) * 100);
};
