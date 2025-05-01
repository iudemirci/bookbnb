import { useEffect, useState } from "react";

const defaultBreakpoints = {
  small: "(max-width: 768px)",
  large: "(max-width: 1024px)",
  xl: "(min-width: 1280px)",
};

export function useBreakpoints(customBreakpoints) {
  const breakpoints = customBreakpoints || defaultBreakpoints;

  const getMatches = () => {
    const entries = Object.entries(breakpoints).map(([key, query]) => {
      const match =
        typeof window !== "undefined" && window.matchMedia(query).matches;
      return [key, match];
    });
    return Object.fromEntries(entries);
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryLists = Object.entries(breakpoints).map(([key, query]) => ({
      key,
      mql: window.matchMedia(query),
    }));

    const handleChange = () => setMatches(getMatches());

    mediaQueryLists.forEach(({ mql }) =>
      mql.addEventListener("change", handleChange),
    );
    return () => {
      mediaQueryLists.forEach(({ mql }) =>
        mql.removeEventListener("change", handleChange),
      );
    };
  }, [JSON.stringify(breakpoints)]);

  return matches;
}
