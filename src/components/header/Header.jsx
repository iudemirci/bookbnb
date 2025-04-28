import SearchBar from "./SearchBar.jsx";
import HeaderCarousel from "./HeaderCarousel.jsx";
import Container from "../Container.jsx";
import ButtonLanguage from "../buttons/ButtonLanguage.jsx";
import Button from "../buttons/Button.jsx";
import { Flex } from "antd";
import Logo from "../Logo.jsx";
import HeaderAccount from "./HeaderAccount.jsx";
import { motion } from "framer-motion";
import useHasScrolled from "../../hooks/useHasScrolled.js";
import { SMOOTH } from "../../config/motionConfig.js";
import SearchBarMobile from "./SearchBarMobile.jsx";
import { useMediaQuery } from "react-responsive";
import ButtonFilters from "../buttons/ButtonFilters.jsx";
import HeaderPrices from "./HeaderPrices.jsx";

function Header() {
  const hasScrolled = useHasScrolled();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <header className="bg-bg-primary fixed z-20 w-full shadow-md shadow-gray-200/50 md:shadow-none">
        <Container>
          <SearchBarMobile />

          <Flex
            align="center"
            justify="space-between"
            className="!relative !hidden !min-h-[80px] md:!flex"
          >
            <div className="!hidden md:!flex">
              <Logo />
            </div>

            <Flex
              align="center"
              justify="space-between"
              className="mt-3 !hidden md:!flex"
            >
              <Button>Bookbnb your home</Button>
              <ButtonLanguage text={false} />
              <HeaderAccount />
            </Flex>
          </Flex>

          <motion.div
            initial={{ height: 65 }}
            animate={{ height: hasScrolled ? 0 : 65 }}
            transition={{ duration: 0.4, ease: SMOOTH }}
            className="hidden items-start justify-center md:flex md:px-7"
          >
            <SearchBar />
          </motion.div>
        </Container>

        <div className="border-border-grey md:border-t">
          <Container className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <HeaderCarousel />
            </div>

            <Flex className="!hidden flex-shrink-0 gap-2 md:!flex">
              <ButtonFilters />
              <HeaderPrices />
            </Flex>
          </Container>
        </div>
      </header>

      <motion.div
        initial={{ paddingTop: "240px" }}
        animate={{
          paddingTop: hasScrolled
            ? "0px"
            : isTabletOrMobile
              ? "150px"
              : "230px",
        }}
        transition={{ duration: 0.4, ease: SMOOTH }}
      />
    </>
  );
}

export default Header;
