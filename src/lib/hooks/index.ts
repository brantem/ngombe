import { useState, useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useCurrentHeight = () => {
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
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
