import { lazy, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../components/Container.jsx';
import Footer from '../components/Footer.jsx';
import MainContainer from '../components/MainContainer.jsx';
import Navigation from '../components/Navigation.jsx';
import CardList from '../components/cards/CardList.jsx';
import HeaderHome from '../components/header/HeaderHome.jsx';
import MobileNavigationDrawer from '../components/modals/MobileSearchDrawer.jsx';
const LoginModal = lazy(() => import('../components/modals/LoginModal.jsx'));
const SignupModal = lazy(() => import('../components/modals/SignupModal.jsx'));
const BookBnbHomeModal = lazy(() => import('../components/modals/BookBnbHome/BookBnbHomeModal.jsx'));

import { useListings } from '../hooks/listings/useListings.js';

function Home() {
  const { t } = useTranslation();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending: isInfinitePending, listings } = useListings();

  useEffect(() => {
    document.title = t('document_title');
  });

  return (
    <>
      <HeaderHome />
      <MainContainer>
        <SignupModal />
        <LoginModal />
        <BookBnbHomeModal />
        <MobileNavigationDrawer />

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
    </>
  );
}

export default memo(Home);
