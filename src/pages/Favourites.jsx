import { Space, Spin, Typography } from 'antd';

import MainContainer from '../components/MainContainer.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';
import HeaderGeneral from '../components/header/HeaderGeneral.jsx';
import Container from '../components/Container.jsx';
import Footer from '../components/Footer.jsx';
import { useIsLiked } from '../hooks/liked/useIsLiked.js';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import { useLikedListings } from '../hooks/liked/useLikedListings.js';
import { t } from 'i18next';
import CardList from '../components/cards/CardList.jsx';

function Favourites() {
  const user = useSelector((state) => state.auth.user);
  const { data: likedData, isPending: isLikedDataPending } = useIsLiked(user?.id);
  const listingIds = map(likedData, 'listing_id');
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isInfinitePending,
    listings,
  } = useLikedListings(listingIds);

  return (
    <MainContainer>
      <HeaderGeneral />

      <BookBnbHomeModal />

      <Container as='main' className='py-8'>
        <Space direction='vertical' size={4}>
          <Typography.Title level={2} className='!font-extrabold'>
            {t('favourites_title')}
          </Typography.Title>
          <Typography.Text type='secondary'>{t('favourites_subtitle')}</Typography.Text>
        </Space>

        <CardList
          listType='favourites'
          listings={listings}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isInfinitePending={isInfinitePending}
        />
      </Container>

      <Footer />
    </MainContainer>
  );
}

export default Favourites;
