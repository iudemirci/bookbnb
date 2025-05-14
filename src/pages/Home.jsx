import { lazy, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HeaderHome = lazy(() => import('../components/header/HeaderHome.jsx'));
const Container = lazy(() => import('../components/Container.jsx'));
const Footer = lazy(() => import('../components/Footer.jsx'));
const Navigation = lazy(() => import('../components/Navigation.jsx'));
const MainContainer = lazy(() => import('../components/MainContainer.jsx'));
const SignupModal = lazy(() => import('../components/modals/SignupModal.jsx'));
const LoginModal = lazy(() => import('../components/modals/LoginModal.jsx'));
const BookBnbHomeModal = lazy(() => import('../components/modals/BookBnbHome/BookBnbHomeModal.jsx'));
const CardList = lazy(() => import('../components/cards/CardList.jsx'));

import { useListings } from '../hooks/listings/useListings.js';
import MobileSearchModal from '../components/modals/MobileSearchModal.jsx';

function Home() {
  const { t } = useTranslation();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending: isInfinitePending, listings } = useListings();

  useEffect(() => {
    document.title = t('document_title');
  });

  return (
    <MainContainer>
      <HeaderHome />
      <SignupModal />
      <LoginModal />
      <BookBnbHomeModal />
      <MobileSearchModal />

      <Container as='main'>
        <CardList
          listType='home'
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isInfinitePending={isInfinitePending}
          listings={listings}
          hasNextPage={hasNextPage}
        />
      </Container>

      <Footer />
      <Navigation />
    </MainContainer>
  );
}

export default memo(Home);
