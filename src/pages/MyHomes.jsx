import { lazy, memo } from 'react';
import { Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

const HeaderGeneral = lazy(() => import('../components/header/HeaderGeneral.jsx'));
const BookBnbHomeModal = lazy(() => import('../components/modals/BookBnbHome/BookBnbHomeModal.jsx'));
const Footer = lazy(() => import('../components/Footer.jsx'));
const CardList = lazy(() => import('../components/cards/CardList.jsx'));

import MainContainer from '../components/MainContainer.jsx';
import Container from '../components/Container.jsx';
import { useUserListings } from '../hooks/listings/useUserListings.jsx';
import { useTranslation } from 'react-i18next';
import MobileSearchModal from '../components/modals/MobileSearchModal.jsx';

function MyHomes() {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isInfinitePending,
    listings,
  } = useUserListings(user?.id);

  return (
    <MainContainer>
      <HeaderGeneral />

      <BookBnbHomeModal />
      <MobileSearchModal />

      <Container as='main' className='py-8'>
        <Space direction='vertical' size={4}>
          <Typography.Title level={2} className='!font-extrabold'>
            {t('my_homes')}
          </Typography.Title>
          <Typography.Text type='secondary'>{t('my_homes_subtitle')}</Typography.Text>
        </Space>

        <CardList
          listType='my_homes'
          isInfinitePending={isInfinitePending}
          listings={listings}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Container>

      <Footer />
    </MainContainer>
  );
}

export default memo(MyHomes);
