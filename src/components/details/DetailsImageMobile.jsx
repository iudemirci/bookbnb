import 'swiper/css/pagination';

import { Carousel, Image, Skeleton } from 'antd';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { CUSTOM } from '../../config/motionConfig.js';

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
      .map((_, index) => <ImageSkeleton key={`skeleton-${index}`} />);
  };

  const renderImageSlides = () => {
    return photos?.map((path, index) => {
      const isLoaded = loadedImages[index];
      const fullUrl = `${BASE_URL}${path}`.replace(/&quot;|"/g, '').replace(/;/g, '');

      return (
        <div className='spect-[6/4] size-full'>
          {!isLoaded && <ImageSkeleton />}
          <Image
            key={`image-${index}`}
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
        </div>
      );
    });
  };

  return (
    <Image.PreviewGroup>
      <Carousel
        arrows
        easing={CUSTOM}
        infinite={false}
        className='relative !aspect-[6/4] !w-full overflow-hidden rounded-3xl md:!hidden'
      >
        {isPending ? renderSkeletonSlides() : renderImageSlides()}
      </Carousel>
    </Image.PreviewGroup>
  );
}

export default DetailsImageMobile;
