import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

import { Image, Skeleton } from 'antd';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

const BASE_URL = import.meta.env.VITE_SUPABASE_IMG_URL;

function DetailsImageMobile({ photos, isPending, className }) {
  const [imgLoaded, setImageLoaded] = useState(false);

  const ImageSkeleton = useCallback(() => {
    return (
      <div className={clsx('aspect-[6/4] overflow-hidden rounded', className)}>
        <Skeleton.Image className='!h-full min-w-full' active />
      </div>
    );
  }, [className]);

  const handleImageLoad = () => {
    setImageLoaded(true);
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
      const fullUrl = `${BASE_URL}${path}`.replace(/&quot;|"/g, '').replace(/;/g, '');

      return (
        <SwiperSlide key={`image-${index}`}>
          {!imgLoaded && <ImageSkeleton />}
          <Image
            src={fullUrl}
            alt={`listing image ${index + 1}`}
            loading='lazy'
            onLoad={() => handleImageLoad(index)}
            className={clsx(
              'aspect-[6/4] !min-w-full rounded !object-cover !object-center duration-300',
              className,
              imgLoaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <Image.PreviewGroup>
      <Swiper className='size-full' modules={[Pagination]} pagination={{ clickable: true }} slidesPerView='auto'>
        {isPending ? renderSkeletonSlides() : renderImageSlides()}
      </Swiper>
    </Image.PreviewGroup>
  );
}

export default DetailsImageMobile;
