import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

import { Image, Skeleton } from 'antd';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

const BASE_URL = import.meta.env.VITE_SUPABASE_IMG_URL;

function DetailsImageMobile({ photos, isPending, className }) {
  const [loadedImages, setLoadedImages] = useState({});

  const ImageSkeleton = useCallback(() => {
    return (
      <div className={clsx('aspect-[6/4] overflow-hidden rounded-lg', className)}>
        <Skeleton.Image className='!h-full min-w-full' active />
      </div>
    );
  }, [className]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const renderSkeletonSlides = () => {
    return Array(3)
      .fill(null)
      .map((_, index) => (
        <SwiperSlide key={`skeleton-${index}`}>
          <ImageSkeleton />
        </SwiperSlide>
      ));
  };

  const renderImageSlides = () => {
    return photos?.map((path, index) => {
      const isLoaded = loadedImages[index];
      const fullUrl = `${BASE_URL}${path}`.replace(/&quot;|"/g, '').replace(/;/g, '');

      return (
        <SwiperSlide key={`image-${index}`} className='aspect-[6/4] size-full'>
          {!isLoaded && <ImageSkeleton />}
          <Image
            src={fullUrl}
            alt={`listing image ${index + 1}`}
            loading='lazy'
            onLoad={() => handleImageLoad(index)}
            rootClassName='size-full'
            className={clsx(
              'aspect-[6/4] size-full overflow-hidden rounded-lg !object-cover !object-center duration-300',
              className,
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            wrapperClassName='w-full h-full'
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <Image.PreviewGroup>
      <Swiper
        className='aspect-[6/4] w-full overflow-hidden rounded-lg md:!hidden'
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {isPending ? renderSkeletonSlides() : renderImageSlides()}
      </Swiper>
    </Image.PreviewGroup>
  );
}

export default DetailsImageMobile;
