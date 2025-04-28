import { useState, useEffect, useRef } from "react";

export function useScrollDirection({ threshold = 0 } = {}) {
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const scrollDifference = Math.abs(scrollY - lastScrollY.current);

      if (scrollDifference < threshold) {
        return;
      }

      const direction = scrollY > lastScrollY.current ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection, threshold]);

  return scrollDirection;
}
