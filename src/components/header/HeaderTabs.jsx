import { Flex, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { SMOOTH } from '../../config/motionConfig.js';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function HeaderTabs() {
  const expanded = useSelector((state) => state.app.expanded);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const tabs = useMemo(() => {
    return [
      { label: t('explore'), to: '/' },
      { label: t('my_homes'), to: '/my_homes' },
    ];
  }, [t]);

  return (
    <motion.div
      initial={{
        translateY: -200,
      }}
      animate={{
        translateY: expanded ? -60 : -200,
      }}
      transition={{ duration: 0.2, ease: SMOOTH }}
      className='absolute top-0 left-1/2 z-10 hidden -translate-x-[110%] md:block lg:-translate-x-1/2'
    >
      <Flex align='center' justify='center' gap={8}>
        {tabs.map(({ label, to }, idx) => (
          <Link key={idx} to={to}>
            <div className='px-4 py-2'>
              <Typography.Text
                className={clsx(
                  '!text-xl capitalize duration-100',
                  pathname === to ? 'font-bold' : '!text-text-secondary hover:text-text-primary',
                )}
              >
                {label}
              </Typography.Text>
            </div>
          </Link>
        ))}
      </Flex>
    </motion.div>
  );
}

export default HeaderTabs;
