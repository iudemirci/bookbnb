import { SMOOTH } from "../../config/motionConfig.js";
import { motion } from "framer-motion";
import useHasScrolled from "../../hooks/useHasScrolled.js";
import { useBreakpoints } from "../../hooks/useBreakpoints.js";

function HeaderFixedPlaceholder() {
  const hasScrolled = useHasScrolled();
  const { small, large } = useBreakpoints();

  return (
    <motion.div
      initial={{
        height: hasScrolled
          ? "0px"
          : small
            ? "150px"
            : large
              ? "325px"
              : "230px",
      }}
      animate={{
        height: hasScrolled
          ? "0px"
          : small
            ? "150px"
            : large
              ? "325px"
              : "230px",
      }}
      transition={{ duration: 0.8, ease: SMOOTH }}
    />
  );
}

export default HeaderFixedPlaceholder;
