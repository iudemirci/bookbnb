import { Col, Flex, Row } from 'antd';
const { Title, Text } = Typography;
import { Typography } from 'antd';
import { Icon } from '@iconify/react';

import { memo, useMemo } from 'react';
import { getRandomDateRangeForNextWeek } from '../../utils/getRandomDateRangeForNextWeek.js';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonWishlist from '../buttons/ButtonLiked.jsx';
import HomeCardPrice from './HomeCardPrice.jsx';
import clsx from 'clsx';
import CardCarousel from './CardCarousel.jsx';

function HomeCard({ listing, idx }) {
  const { t } = useTranslation();

  const { id, location, photos, price, category } = listing;
  const randomBetween3And5 = useMemo(() => (Math.random() * (5 - 3) + 3).toFixed(1), []);
  const randomDate = getRandomDateRangeForNextWeek();

  return (
    <Link to={`/listing/${id}`}>
      <Flex vertical={true}>
        <div className='relative aspect-14/13 w-full rounded-3xl shadow-sm'>
          <span
            className={clsx(
              'bg-bg-primary pointer-events-none absolute top-4 left-4 z-10 rounded-full px-3 py-1.5 font-medium shadow-xl',
              idx >= 5 && 'hidden',
            )}
          >
            {t('guest_fav')}
          </span>
          <span className='absolute top-4 right-4 z-10'>
            <ButtonWishlist listID={id} card={true} />
          </span>
          <CardCarousel photos={photos} />
        </div>
        <div className='cursor-pointer pt-2'>
          <Row justify='space-between' align='middle' wrap={false}>
            <Col className='min-w-0 flex-1'>
              <Title level={5} className='truncate'>
                {location}
              </Title>
            </Col>
            <Col className='flex-shrink-0'>
              <Flex align='center'>
                <Icon icon='material-symbols-light:star-rounded' width='24' />
                <Text className='font-normal'>{randomBetween3And5}</Text>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type='secondary' size='24'>
                {t(`tabs:${category}`)}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type='secondary'>{randomDate}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <HomeCardPrice price={price} />
            </Col>
          </Row>
        </div>
      </Flex>
    </Link>
  );
}

export default memo(HomeCard);
