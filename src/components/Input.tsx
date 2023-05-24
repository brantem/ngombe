import { forwardRef } from 'react';

import { cn } from 'lib/helpers';

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, className, ...props }, ref) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-neutral-500">{label}</span>
      <input
        ref={ref}
        className={cn(
          'text-2xl font-extrabold text-neutral-700 outline-none rounded-xl h-12 px-3 border-2 border-neutral-200',
          className,
        )}
        {...props}
      />
    </label>
  );
});

export default Input;
