import { Space, Typography } from 'antd';

import MainContainer from '../components/MainContainer.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import Container from '../components/Container.jsx';
import Footer from '../components/Footer.jsx';
import { useSelector } from 'react-redux';
import { useReservations } from '../hooks/reservation/useReservations.js';
import CardList from '../components/cards/CardList.jsx';
import { sortReservationsByDate } from '../utils/sortReservationsByDate.js';
import { useTranslation } from 'react-i18next';
import MobileNavigationDrawer from '../components/modals/MobileSearchDrawer.jsx';

function Trips() {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isInfinitePending,
    reservations,
  } = useReservations(user?.id);
  const sortedReservations = sortReservationsByDate(reservations);

  return (
    <MainContainer>
      <HeaderGeneral />

      <MobileNavigationDrawer />
      <BookBnbHomeModal />

      <Container as='main' className='py-8'>
        <Space direction='vertical' size={4}>
          <Typography.Title level={2} className='!font-extrabold'>
            {t('trips_title')}
          </Typography.Title>
          <Typography.Text type='secondary'> {t('trips_subtitle')}</Typography.Text>
        </Space>

        <CardList
          listType='trips'
          isInfinitePending={isInfinitePending}
          listings={sortedReservations}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Container>

      <Footer />
    </MainContainer>
  );
}

export default Trips;
