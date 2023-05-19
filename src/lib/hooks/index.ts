import { useState, useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useCurrentHeight = () => {
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      console.log(window.innerHeight);
      if (typeof window === 'undefined') return;
      setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return height;
};

export const useDebounce = <T extends any>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export * from 'lib/hooks/useModal';
