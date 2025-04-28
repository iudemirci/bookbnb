import Header from "../components/header/Header.jsx";
import MainWrapper from "../components/MainWrapper.jsx";
import HomeList from "../components/home/HomeList.jsx";
import Footer from "../components/Footer.jsx";
import Navigation from "../components/nav/Navigation.jsx";

function Home() {
  return (
    <>
      <Header />
      <MainWrapper as="main">
        <HomeList />
      </MainWrapper>

      <Footer />

      <Navigation />
    </>
  );
}

export default Home;
