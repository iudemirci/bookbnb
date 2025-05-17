import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Col, Flex, Image, Row, Skeleton } from 'antd';

const BASE_URL = import.meta.env.VITE_SUPABASE_IMG_URL;

function DetailsImageDesktop({ photos, isPending, className, ...props }) {
  const [loadedImages, setLoadedImages] = useState({});

  const ImageSkeleton = useCallback(() => {
    return (
      <div className={clsx('size-full overflow-hidden rounded-lg', className)}>
        <Skeleton.Image className='!h-full min-w-full' active />
      </div>
    );
  }, [className]);

  const handleImageLoad = (idx) => {
    setLoadedImages((prev) => ({
      ...prev,
      [idx]: true,
    }));
  };

  const renderImageSlides = (path, idx) => {
    const isLoaded = loadedImages[idx];
    const fullUrl = `${BASE_URL}${path}`.replace(/&quot;|"/g, '').replace(/;/g, '');
    return path ? (
      <Image
        src={fullUrl}
        alt={`listing image ${idx + 1}`}
        loading='lazy'
        onLoad={() => handleImageLoad(idx)}
        className={clsx(
          '!size-full !object-cover !object-center duration-200',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    ) : (
      <img
        src='https://placehold.co/600x400?text=No+Image'
        alt={`fallback image ${idx + 1}`}
        className={clsx(
          'pointer-events-none !size-full !object-cover !object-center duration-200 select-none',
          className,
        )}
      />
    );
  };

  return (
    <Image.PreviewGroup>
      <Flex className='!hidden h-110 w-full md:!flex' gap={8} {...props}>
        <div className='size-full w-[50%] overflow-hidden rounded-l-2xl'>
          <div className='size-full'>{isPending ? <ImageSkeleton /> : renderImageSlides(photos?.[0], 0)}</div>
        </div>
        <div className='grid size-full w-[50%] grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-r-2xl'>
          <div className='size-full'>{isPending ? <ImageSkeleton /> : renderImageSlides(photos?.[1], 1)}</div>
          <div className='size-full'>{isPending ? <ImageSkeleton /> : renderImageSlides(photos?.[2], 2)}</div>
          <div className='size-full'>{isPending ? <ImageSkeleton /> : renderImageSlides(photos?.[3], 3)}</div>
          <div className='size-full'>{isPending ? <ImageSkeleton /> : renderImageSlides(photos?.[4], 4)}</div>
        </div>
      </Flex>
    </Image.PreviewGroup>
  );
}

export default DetailsImageDesktop;
