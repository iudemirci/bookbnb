import { useState, useEffect } from "react";
import { debounce } from "lodash";

const useHasScrolled = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 10); // 100ms debounce

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      debouncedHandleScroll.cancel();
    };
  }, []);

  return hasScrolled;
};

export default useHasScrolled;
