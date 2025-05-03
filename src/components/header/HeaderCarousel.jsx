import { Icon } from '@iconify/react';
import { memo, useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode, Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import ButtonsCarousel from '../buttons/ButtonsCarousel.jsx';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { categories } from '../../data/categories.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/appSlice.js';

function HeaderCarousel() {
  const selectedCategory = useSelector((state) => state.app.category);
  const dispatch = useDispatch();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef(null);
  const { t } = useTranslation('tabs');

  const updateNavigationState = useCallback(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;
    if (!swiper) return;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleClick = useCallback(
    (key) => {
      dispatch(setCategory(key));
    },
    [dispatch],
  );

  return (
    <Swiper
      ref={swiperRef}
      modules={[Mousewheel, FreeMode, Navigation]}
      navigation={{
        prevEl: '.custom-prev',
        nextEl: '.custom-next',
      }}
      slidesPerView='auto'
      freeMode={true}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: false,
      }}
      spaceBetween={25}
      onSliderMove={updateNavigationState}
      onTouchMove={updateNavigationState}
      onSlideChange={updateNavigationState}
      onInit={updateNavigationState}
      className={clsx(
        'relative overflow-hidden',
        'before:from-bg-primary before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-25 before:bg-gradient-to-r before:to-transparent before:transition-opacity',
        'after:from-bg-primary after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-25 after:bg-gradient-to-l after:to-transparent after:transition-opacity',
        !isBeginning ? 'before:opacity-100' : 'before:opacity-0',
        !isEnd ? 'after:opacity-100' : 'after:opacity-0',
      )}
    >
      {categories.map(({ key, icon }, idx) => (
        <SwiperSlide
          key={idx}
          className={clsx(
            'group/slide relative my-2 !flex max-w-25 cursor-pointer flex-col !items-center !justify-center gap-1 rounded-lg py-2 duration-300 first:pl-0 last:pr-0',
            selectedCategory === key ? '!text-black' : '!text-gray-500',
          )}
          onClick={() => handleClick(key)}
        >
          <Icon icon={icon} width='28' height='28' />
          <Typography.Text
            className={clsx(
              '!truncate !text-sm font-bold text-nowrap',
              selectedCategory === key ? '!text-black' : '!text-gray-500',
            )}
          >
            {t(key)}
          </Typography.Text>
          <span
            className={clsx(
              'absolute bottom-0 left-0 h-[1.5px] w-full duration-300',
              selectedCategory === key ? 'bg-black' : 'bg-transparent group-hover/slide:bg-gray-300',
            )}
          />
        </SwiperSlide>
      ))}

      <ButtonsCarousel isBeginning={isBeginning} isEnd={isEnd} type='header' />
    </Swiper>
  );
}

export default memo(HeaderCarousel);
