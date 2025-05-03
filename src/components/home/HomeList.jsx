import HomeCard from './HomeCard.jsx';
import { Col, Row, Spin } from 'antd';
import { useEffect, useRef } from 'react';
import HomeCardSkeleton from './HomeCardSkeleton.jsx';
import { useListings } from '../../hooks/listings/useListings.js';

function HomeList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending: isInfinitePending, listings } = useListings();
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderSkeletons = (count = 8) => {
    return Array(count)
      .fill(null)
      .map((_, idx) => (
        <Col
          key={`skeleton-${idx}`}
          role='listitem'
          xs={24}
          sm={12}
          md={8}
          lg={6}
          className='3xl:!max-w-[20%] 3xl:!basis-[20%] 4xl:!max-w-[16.6%] 4xl:!basis-[16.6%] 2xl:!max-w-[25%] 2xl:!basis-[25%]'
        >
          <HomeCardSkeleton />
        </Col>
      ));
  };

  return (
    <ul className='py-6'>
      <Row gutter={[24, 40]} role='list'>
        {listings?.map((listing, idx) => (
          <Col
            key={idx}
            role='listitem'
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className='3xl:!max-w-[20%] 3xl:!basis-[20%] 4xl:!max-w-[16.6%] 4xl:!basis-[16.6%] 2xl:!max-w-[25%] 2xl:!basis-[25%]'
          >
            <HomeCard listing={listing} />
          </Col>
        ))}

        {isInfinitePending && renderSkeletons()}

        {isFetchingNextPage && renderSkeletons(4)}
      </Row>
      {!isInfinitePending && hasNextPage && <div ref={loadMoreRef} style={{ height: 20, visibility: 'hidden' }} />}
    </ul>
  );
}

export default HomeList;
