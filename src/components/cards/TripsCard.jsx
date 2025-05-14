import { Col, Flex, Row, Typography } from 'antd';

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonWishlist from '../buttons/ButtonLiked.jsx';
import clsx from 'clsx';
import CardCarousel from './CardCarousel.jsx';
import dayjs from 'dayjs';
import { formatPrice } from '../../utils/bookingUtils.js';
import ButtonCancelReservation from '../buttons/ButtonCancelReservation.jsx';

const { Title, Text } = Typography;

function TripsCard({ listing, idx }) {
  console.log('🚀 ~ TripsCard ~ listing: ', listing);
  const { t } = useTranslation();

  const { id, listing_id, location, photos, price, date, currency } = listing;
  const [from, to] = date;
  const count = dayjs(to).diff(dayjs(from), 'day');
  const isPast = dayjs().isAfter(dayjs(from), 'day');
  const formattedPrice = formatPrice(price, currency);

  const convertedDates = useMemo(() => {
    const convertedFrom = dayjs(from).format('DD MMM YYYY');
    const convertedTo = dayjs(to).format('DD MMM YYYY');

    return convertedFrom + ' / ' + convertedTo;
  }, [from, to]);

  return (
    <Link to={`/listing/${listing_id}`}>
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
        <div className='cursor-pointer pt-3'>
          <Row justify='space-between' align='middle' wrap={false}>
            <Col className='min-w-0 flex-1'>
              <Title level={5} className='!mb-1 truncate'>
                {location}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type='secondary'>{convertedDates}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type='secondary'>
                <Text underline className='!font-bold'>
                  {formattedPrice}
                </Text>{' '}
                {t('details:for_nights', { count: count })}
              </Text>
            </Col>
          </Row>
          {!isPast && (
            <Row>
              <Col className='w-full !pt-2'>
                <ButtonCancelReservation reservationId={id} />
              </Col>
            </Row>
          )}
        </div>
      </Flex>
    </Link>
  );
}

export default memo(TripsCard);
