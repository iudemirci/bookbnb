import { Button, Col, Flex, Row, Space } from 'antd';
const { Title, Text } = Typography;
import { Typography } from 'antd';

import { memo } from 'react';
import { Link } from 'react-router-dom';
import ButtonLiked from '../buttons/ButtonLiked.jsx';
import { useTranslation } from 'react-i18next';
import HomeCardPrice from './HomeCardPrice.jsx';
import CardCarousel from './CardCarousel.jsx';

function MyHomeCard({ listing }) {
  const { t } = useTranslation();
  const { id, location, photos, price, category } = listing;

  return (
    <Link to={`/listing/${id}`}>
      <Flex vertical>
        <div className='relative aspect-14/13 w-full rounded-3xl shadow-sm'>
          <span className='absolute top-4 right-4 z-10'>
            <ButtonLiked listID={id} card={true} />
          </span>
          <CardCarousel photos={photos} />
        </div>
        <div className='cursor-pointer pt-3'>
          <Row>
            <Col>
              <Title level={5} className='!mb-1 truncate'>
                {location}
              </Title>
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
              <HomeCardPrice price={price} count={1} />
            </Col>
          </Row>
          <Row>
            <Col className='w-full !pt-2'>
              <Button type='primary' block className='!rounded-xl'>
                {t('delete_listing')}
              </Button>
            </Col>
          </Row>
        </div>
      </Flex>
    </Link>
  );
}

export default memo(MyHomeCard);
