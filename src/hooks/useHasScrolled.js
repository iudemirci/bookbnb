import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

const useHasScrolled = (threshold = 0, delay = 100) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > threshold;
    setHasScrolled((prev) => {
      if (prev !== scrolled) return scrolled;
      return prev;
    });
  }, [threshold]);

  useEffect(() => {
    handleScroll();
    const throttledHandleScroll = throttle(handleScroll, delay);

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [handleScroll, delay]);

  return hasScrolled;
};

export default useHasScrolled;
