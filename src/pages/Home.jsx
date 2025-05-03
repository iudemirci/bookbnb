import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import HeaderHome from '../components/header/HeaderHome.jsx';
import Container from '../components/Container.jsx';
import HomeList from '../components/home/HomeList.jsx';
import Footer from '../components/Footer.jsx';
import Navigation from '../components/nav/Navigation.jsx';
import MainContainer from '../components/MainContainer.jsx';
import SignupModal from '../components/modals/SignupModal.jsx';
import LoginModal from '../components/modals/LoginModal.jsx';
import BookBnbHomeModal from '../components/modals/BookBnbHome/BookBnbHomeModal.jsx';

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
