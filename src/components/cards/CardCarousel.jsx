import { Carousel } from 'antd';
import { memo, useMemo, useState } from 'react';
import { CUSTOM } from '../../config/motionConfig.js';
import clsx from 'clsx';

const BASE_URL = import.meta.env.VITE_SUPABASE_IMG_URL;

function CardCarousel({ photos }) {
  const [loadedIndexes, setLoadedIndexes] = useState({});

  const imageUrls = useMemo(
    () => photos?.map((path) => `${BASE_URL}${path}`.replace(/&quot;|"/g, '').replace(/;/g, '')),
    [photos],
  );

  const handleLoad = (idx) => {
    setLoadedIndexes((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <Carousel draggable dots arrows easing={CUSTOM} infinite={false} className='relative overflow-hidden rounded-3xl'>
      {imageUrls?.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt='listing image'
          loading='lazy'
          className={clsx(
            'aspect-square size-full object-cover object-center duration-300',
            loadedIndexes[idx] ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => handleLoad(idx)}
        />
      ))}
    </Carousel>
  );
}

export default memo(CardCarousel);
