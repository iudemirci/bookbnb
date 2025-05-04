import { motion } from 'framer-motion';
import { useState, useEffect, useRef, memo } from 'react';
import SearchBar from './SearchBar.jsx';
import useHasScrolled from '../../hooks/useHasScrolled.js';
import clsx from 'clsx';
import { SMOOTH } from '../../config/motionConfig.js';

const CenteredSearchBar = () => {
  const containerRef = useRef(null);
  const [initialPosition, setInitialPosition] = useState({ top: 0, left: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const hasScrolled = useHasScrolled();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setInitialPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [windowSize]);

  const calculateCenterPosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();

    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;

    const elementCenterX = initialPosition.left + rect.width / 2;
    const elementCenterY = initialPosition.top + rect.height / 2;

    const moveX = centerX - elementCenterX;
    const moveY = centerY - elementCenterY - window.scrollY;

    return { x: moveX, y: moveY };
  };

  const centerPos = calculateCenterPosition();

  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    if (!hasScrolled) {
      const timeout = setTimeout(() => {
        setInteractive(false);
      }, 200);

      return () => clearTimeout(timeout);
    } else {
      setInteractive(true);
    }
  }, [hasScrolled]);

  return (
    <motion.div
      layout
      ref={containerRef}
      initial={{ opacity: 1 }}
      // animate={{
      //   opacity: hasScrolled ? 1 : 0,
      //   // x: hasScrolled ? 0 : centerPos.x,
      //   translateY: hasScrolled ? 0 : '58px',
      //   scale: hasScrolled ? 1 : 1.5,
      // }}
      // transition={{ duration: 0.2, ease: SMOOTH }}
      // onAnimationComplete={() => {
      //   if (hasScrolled) {
      //     setInteractive(true);
      //   }
      // }}
      // className={clsx('w-full', !interactive && 'pointer-events-none')}
      className='w-full'
    >
      <SearchBar />
    </motion.div>
  );
};
export default memo(CenteredSearchBar);
