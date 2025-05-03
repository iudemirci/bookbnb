import { motion } from 'framer-motion';
import { SMOOTH } from '../../config/motionConfig.js';
import useHasScrolled from '../../hooks/useHasScrolled.js';
import { useBreakpoints } from '../../hooks/useBreakpoints.js';

function HeaderSearchbarPlaceholder() {
  const hasScrolled = useHasScrolled();
  const { large } = useBreakpoints();

  return (
    <motion.div
      layout
      initial={{ height: hasScrolled ? 0 : large ? 160 : 65 }}
      // animate={{ height: hasScrolled ? 0 : large ? 160 : 65 }}
      transition={{ duration: 0.4, ease: SMOOTH }}
      className='hidden items-start justify-center md:flex md:px-7'
    />
  );
}

export default HeaderSearchbarPlaceholder;
