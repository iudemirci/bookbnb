import { Swiper, SwiperSlide } from 'swiper/react';
import { memo, useCallback, useRef, useState } from 'react';
import { Navigation, Pagination, Mousewheel, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ButtonsCarousel from '../buttons/ButtonsCarousel.jsx';
import { Image } from 'antd';
import clsx from 'clsx';

const BASE_URL = import.meta.env.VITE_SUPABASE_IMG_URL;

function HomeCardCarousel({ photos }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  const updateNavigationState = useCallback(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;
    if (!swiper) return;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <div className='size-full overflow-hidden rounded-3xl'>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Mousewheel, FreeMode]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          swiper.on('slideChange', updateNavigationState);
          swiper.on('resize', updateNavigationState);
          swiper.on('orientationchange', updateNavigationState);
          swiper.on('beforeTransitionStart', updateNavigationState);
          swiper.on('afterTransitionStart', updateNavigationState);
          swiper.on('fromEdge', updateNavigationState);
          swiper.on('toEdge', updateNavigationState);
          swiper.on('reachBeginning', () => setIsBeginning(true));
          swiper.on('reachEnd', () => setIsEnd(true));
        }}
        onSlideChange={updateNavigationState}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        onFromEdge={updateNavigationState}
        pagination={{ clickable: true }}
        grabCursor={false}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        simulateTouch={true}
        allowTouchMove={window.innerWidth < 768}
        noSwiping={false}
        touchRatio={1}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: false,
        }}
        resistance={true}
        resistanceRatio={0}
        className='group relative size-full cursor-pointer'
      >
        {photos.map((path, idx) => {
          const fullUrl = `${BASE_URL}${path}`.replace(/&quot;|"/g, '').replace(/;/g, '');

          return (
            <SwiperSlide key={idx} className='shadow-lg'>
              <Image
                src={fullUrl}
                height='100%'
                width='100%'
                alt='listing-image'
                preview={false}
                loading='lazy'
                className={clsx(
                  'pointer-events-none aspect-square !object-cover !object-center duration-200 select-none',
                  isLoaded ? 'opacity-100' : 'opacity-0',
                )}
                onLoad={() => setIsLoaded(true)}
              />
            </SwiperSlide>
          );
        })}

        <ButtonsCarousel isBeginning={isBeginning} isEnd={isEnd} />
      </Swiper>
    </div>
  );
}

export default memo(HomeCardCarousel);
