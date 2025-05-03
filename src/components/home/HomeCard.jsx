import { Col, Flex, Row } from 'antd';
const { Title, Text } = Typography;
import { Typography } from 'antd';
import { Icon } from '@iconify/react';

import HomeCardCarousel from './HomeCardCarousel.jsx';
import { useReverseGeocode } from '../../hooks/useReverseGeocode.js';
import { memo, useEffect, useMemo, useState } from 'react';
import { getRandomDateRangeForNextWeek } from '../../utils/getRandomDateRangeForNextWeek.js';
import { Link } from 'react-router-dom';

function HomeCard({ listing }) {
  const { id, location, photos, price } = listing;
  const randomBetween3And5 = useMemo(() => (Math.random() * (5 - 3) + 3).toFixed(1), []);
  const randomDate = getRandomDateRangeForNextWeek();

  return (
    <Link to={`/listing/${id}`}>
      <Flex vertical={true}>
        <div className='relative aspect-14/13 w-full rounded-3xl shadow-sm'>
          <span className='bg-bg-primary pointer-events-none absolute top-4 left-4 z-10 rounded-full px-3 py-1.5 font-medium shadow-xl'>
            Guest favourite
          </span>
          <span className='absolute top-4 right-4 z-10'>
            <Icon
              icon='line-md:heart-twotone'
              width={28}
              className='text-primary cursor-pointer duration-200 hover:scale-115 active:scale-108'
            />
          </span>
          <HomeCardCarousel photos={photos} />
        </div>
        <div className='cursor-pointer pt-2'>
          <Row justify='space-between' align='middle'>
            <Col>
              <Title level={5} className='truncate'>
                {location}
              </Title>
            </Col>
            <Col>
              <Flex align='center'>
                <Icon icon='material-symbols-light:star-rounded' width='24' />
                <Text className='font-normal'>{randomBetween3And5}</Text>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type='secondary' size='24'>
                321 kilometers away
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
              <Text type='secondary'>
                <Text underline className='!font-bold'>
                  {(price * 5).toFixed(0)} $
                </Text>{' '}
                for 5 nights
              </Text>
            </Col>
          </Row>
        </div>
      </Flex>
    </Link>
  );
}

export default memo(HomeCard);
