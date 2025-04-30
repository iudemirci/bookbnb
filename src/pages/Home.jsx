import { motion } from "framer-motion";

import Header from "../components/header/Header.jsx";
import Container from "../components/Container.jsx";
import HomeList from "../components/home/HomeList.jsx";
import Footer from "../components/Footer.jsx";
import Navigation from "../components/nav/Navigation.jsx";
import MainContainer from "../components/MainContainer.jsx";
<<<<<<< HEAD
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
=======
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588

function Home() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("document_title");
  });

  return (
    <MainContainer>
      <Header />
      <Container as={motion.main}>
        <HomeList />
      </Container>

      <Footer />

      <Navigation />
    </MainContainer>
  );
}

export default Home;
