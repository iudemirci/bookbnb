import { useState, useEffect, useCallback } from "react";
import { throttle } from "lodash";

const useHasScrolled = (threshold = 0, delay = 100) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > threshold;
    if (hasScrolled !== scrolled) {
      setHasScrolled(scrolled);
    }
  }, [hasScrolled, threshold]);

  useEffect(() => {
    handleScroll();

    const throttledHandleScroll = throttle(handleScroll, delay);

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [handleScroll, delay]);

  return hasScrolled;
};

export default useHasScrolled;