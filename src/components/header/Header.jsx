import HeaderCarousel from "./HeaderCarousel.jsx";
import Container from "../Container.jsx";
import ButtonLanguage from "../buttons/ButtonLanguage.jsx";
<<<<<<< HEAD
import { Button, Flex } from "antd";
=======
import Button from "../buttons/Button.jsx";
import { Flex } from "antd";
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
import Logo from "../Logo.jsx";
import HeaderAccount from "./HeaderAccount.jsx";
import { motion } from "framer-motion";
import useHasScrolled from "../../hooks/useHasScrolled.js";
import { SMOOTH } from "../../config/motionConfig.js";
import SearchBarMobile from "./SearchBarMobile.jsx";
import { useMediaQuery } from "react-responsive";
import ButtonFilters from "../buttons/ButtonFilters.jsx";
import HeaderPrices from "./HeaderPrices.jsx";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import HeaderTabs from "./HeaderTabs.jsx";
import { memo } from "react";
import CenteredSearchBar from "./CenteredSearchBar.jsx";

function Header() {
  const { t } = useTranslation();
  const hasScrolled = useHasScrolled();
  const isSmall = useMediaQuery({ query: "(max-width: 768px)" });
  const isLarge = useMediaQuery({ query: "(max-width: 1024px)" });
=======

function Header() {
  const hasScrolled = useHasScrolled();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588

  return (
    <>
      <header className="bg-bg-primary fixed z-20 w-full shadow-md shadow-gray-200/50 md:shadow-none">
        <Container>
          <SearchBarMobile />

          <Flex
            align="center"
<<<<<<< HEAD
            justify="between"
            className="!relative !hidden !min-h-[80px] w-full px-4 md:!flex"
          >
            {/* Tabs */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <HeaderTabs />
            </div>

            {/*  Logo */}
            <div className="min-w-0 flex-1 shrink-0 basis-auto md:flex lg:basis-[140px]">
              <Logo />
            </div>

            {/* Search small */}
            <div className="flex min-w-0 flex-none shrink-1 basis-auto origin-center justify-center px-6">
              <CenteredSearchBar />
            </div>

            {/* buttons */}
            <nav className="min-w-0 flex-1 shrink-0 basis-auto">
              <Flex align="center" justify="end">
                <Button type="text">{t("bookbnb_your_home")}</Button>
                <ButtonLanguage text={false} />
                <HeaderAccount />
              </Flex>
            </nav>
=======
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
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
          </Flex>

          <motion.div
            initial={{ height: 65 }}
<<<<<<< HEAD
            animate={{ height: hasScrolled ? 0 : isLarge ? 160 : 65 }}
            transition={{ duration: 0.4, ease: SMOOTH }}
            className="hidden items-start justify-center md:flex md:px-7"
          />
=======
            animate={{ height: hasScrolled ? 0 : 65 }}
            transition={{ duration: 0.4, ease: SMOOTH }}
            className="hidden items-start justify-center md:flex md:px-7"
          >
            <SearchBar />
          </motion.div>
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
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

<<<<<<< HEAD
      {/* empty div for fixed nav */}
      <motion.div
        initial={{ height: isSmall ? "230px" : "325px" }}
        animate={{
          height: hasScrolled
            ? "0px"
            : isSmall
              ? "150px"
              : isLarge
                ? "325px"
                : "230px",
        }}
        transition={{ duration: 0.8, ease: SMOOTH }}
=======
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
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
      />
    </>
  );
}

export default memo(Header);
