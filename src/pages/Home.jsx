import { motion } from "framer-motion";

import Header from "../components/header/Header.jsx";
import Container from "../components/Container.jsx";
import HomeList from "../components/home/HomeList.jsx";
import Footer from "../components/Footer.jsx";
import Navigation from "../components/nav/Navigation.jsx";
import MainContainer from "../components/MainContainer.jsx";

function Home() {
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
