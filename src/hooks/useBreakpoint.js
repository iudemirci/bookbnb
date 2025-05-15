// hooks/useBreakpoint.js
import { useEffect, useState } from 'react';

function useBreakpoint() {
  const [breakpoints, setBreakpoints] = useState(() => getBreakpoints(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints(getBreakpoints(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoints;
}

function getBreakpoints(width) {
  return {
    isSmUp: width >= 640,
    isMdUp: width >= 768,
    isLgUp: width >= 1024,
    isXlUp: width >= 1280,
    is2xlUp: width >= 1536,
  };
}

export default useBreakpoint;
