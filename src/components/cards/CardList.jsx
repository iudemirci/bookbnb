import { Button, Col, Flex, Row, Typography } from 'antd';
import CardSkeleton from './CardSkeleton.jsx';
import ButtonResetFilters from '../buttons/ButtonResetFilters.jsx';
import i18next, { t } from 'i18next';
import MyHomeCard from './MyHomeCard.jsx';
import { memo, useEffect, useMemo, useRef } from 'react';
import HomeCard from './HomeCard.jsx';
import TripsCard from './TripsCard.jsx';
import ButtonBookBnb from '../buttons/ButtonBookBnb.jsx';

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
        <CardSkeleton />
      </Col>
    ));
};

function CardList({ listType, listings, isInfinitePending, fetchNextPage, hasNextPage, isFetchingNextPage }) {
  const isPending = isInfinitePending || isFetchingNextPage;

  const loadMoreRef = useRef(null);

  const noDataText = useMemo(() => {
    let title;
    let subtitle;

    switch (listType) {
      case 'home': {
        title = t('home_no_results_title');
        subtitle = t('home_no_results_subtitle');
        break;
      }
      case 'favourites': {
        title = t('favourites_no_results_title');
        subtitle = t('favourites_no_results_subtitle');
        break;
      }
      case 'my_homes': {
        title = t('my_homes_no_results_title');
        subtitle = t('my_homes_no_results_subtitle');
        break;
      }
      case 'trips': {
        title = t('trips_no_results_title');
        subtitle = t('trips_no_results_subtitle');
        break;
      }
      default: {
        break;
      }
    }

    return [title, subtitle];
  }, [listType, i18next.language]);
  const [title, subtitle] = noDataText;

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

  return (
    <ul className='py-8'>
      {!isPending && listings.length === 0 ? (
        <Flex
          vertical
          align='center'
          className='text-text-secondary absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-base'
        >
          <Typography.Title level={2} className='mb-4'>
            {title}
          </Typography.Title>
          <Typography.Text className='mb-4'>{subtitle}</Typography.Text>
          {listType === 'home' && <ButtonResetFilters />}
          {listType === 'my_homes' && <ButtonBookBnb type='primary' />}
          {(listType === 'trips' || listType === 'favourites') && <Button href='/'>{t('explore')}</Button>}
        </Flex>
      ) : (
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
              {(listType === 'home' || listType === 'favourites') && <HomeCard listing={listing} idx={idx} />}
              {listType === 'my_homes' && <MyHomeCard listing={listing} idx={idx} />}
              {listType === 'trips' && <TripsCard listing={listing} idx={idx} />}
            </Col>
          ))}

          {isInfinitePending && renderSkeletons()}
          {isFetchingNextPage && renderSkeletons(4)}
        </Row>
      )}

      {!isInfinitePending && hasNextPage && <div ref={loadMoreRef} style={{ height: 20, visibility: 'hidden' }} />}
    </ul>
  );
}

export default memo(CardList);
