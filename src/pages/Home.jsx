import { lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HeaderHome = lazy(() => import('../components/header/HeaderHome.jsx'));
const Container = lazy(() => import('../components/Container.jsx'));
const HomeList = lazy(() => import('../components/home/HomeList.jsx'));
const Footer = lazy(() => import('../components/Footer.jsx'));
const Navigation = lazy(() => import('../components/nav/Navigation.jsx'));
const MainContainer = lazy(() => import('../components/MainContainer.jsx'));
const SignupModal = lazy(() => import('../components/modals/SignupModal.jsx'));
const LoginModal = lazy(() => import('../components/modals/LoginModal.jsx'));
const BookBnbHomeModal = lazy(() => import('../components/modals/BookBnbHome/BookBnbHomeModal.jsx'));

function Home() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('document_title');
  });

  return (
    <MainContainer>
      <HeaderHome />
      <SignupModal />
      <LoginModal />
      <BookBnbHomeModal />

      <Container as='main'>
        <HomeList />
      </Container>

      <Footer />
      <Navigation />
    </MainContainer>
  );
}

export default Home;
