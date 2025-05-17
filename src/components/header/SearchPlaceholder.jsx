import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'antd';
import { memo, useRef } from 'react';
import { SMOOTH } from '../../config/motionConfig.js';
import { setExpanded } from '../../store/appSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function SearchPlaceholder() {
  const { t } = useTranslation();
  const expanded = useSelector((state) => state.app.expanded);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  function handleClick() {
    dispatch(setExpanded(true));
  }

  return (
    <motion.div
      layout
      ref={containerRef}
      animate={{
        opacity: expanded ? 0 : 1,
        translateY: expanded ? 75 : 0,
        scale: expanded ? 1.45 : 1,
        pointerEvents: expanded ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: SMOOTH }}
      className='w-full'
      onClick={handleClick}
    >
      <div
        className={clsx(
          'border-border-grey shadow-theme hover:shadow-theme-hover relative h-[56px] min-w-[290px] rounded-full border-[0.5px] px-2 duration-300 md:h-[50px]',
        )}
      >
        <Row align='center' justify='space-between' className='h-full' wrap={false}>
          <Col className='min-w-0'>
            <button className='flex size-full cursor-pointer items-center !text-[15px]'>
              <span className='truncate border-r px-4.5 font-bold'>{t('search_anywhere')}</span>
            </button>
          </Col>
          <Col className='min-w-0'>
            <button className='flex size-full cursor-pointer items-center !text-[15px]'>
              <span className='truncate border-r px-4.5 font-bold'>{t('search_anyweek')}</span>
            </button>
          </Col>
          <Col className='flex min-w-0 items-center justify-center'>
            <button className='flex size-full cursor-pointer items-center px-4.5 !text-[15px]'>
              <span className='text-text-secondary truncate'>{t('search_guests')}</span>
            </button>
          </Col>
          <Col className='flex h-full items-center'>
            <Button type='primary' icon={<Icon icon='mdi:magnify' className='text-white' width={15} />}></Button>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
}

export default memo(SearchPlaceholder);
