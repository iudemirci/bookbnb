import HeaderCarousel from "./HeaderCarousel.jsx";
import Container from "../Container.jsx";
import ButtonLanguage from "../buttons/ButtonLanguage.jsx";
import { Button, Flex } from "antd";
import Logo from "../Logo.jsx";
import HeaderAccount from "./HeaderAccount.jsx";
import { motion } from "framer-motion";
import useHasScrolled from "../../hooks/useHasScrolled.js";
import { SMOOTH } from "../../config/motionConfig.js";
import SearchBarMobile from "./SearchBarMobile.jsx";
import { useMediaQuery } from "react-responsive";
import ButtonFilters from "../buttons/ButtonFilters.jsx";
import HeaderPrices from "./HeaderPrices.jsx";
import { useTranslation } from "react-i18next";
import HeaderTabs from "./HeaderTabs.jsx";
import { memo } from "react";
import CenteredSearchBar from "./CenteredSearchBar.jsx";

function Header() {
  const { t } = useTranslation();
  const hasScrolled = useHasScrolled();
  const isSmall = useMediaQuery({ query: "(max-width: 768px)" });
  const isLarge = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <>
      <header className="bg-bg-primary fixed z-20 w-full shadow-md shadow-gray-200/50 md:shadow-none">
        <Container>
          <SearchBarMobile />

          <Flex
            align="center"
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
            <nav className="min-w-0 flex-1 shrink-0 basis-auto xl:basis-[140px]">
              <Flex align="center" justify="end">
                <Button type="text">{t("bookbnb_your_home")}</Button>
                <ButtonLanguage text={false} />
                <HeaderAccount />
              </Flex>
            </nav>
          </Flex>

          <motion.div
            initial={{ height: 65 }}
            animate={{ height: hasScrolled ? 0 : isLarge ? 160 : 65 }}
            transition={{ duration: 0.4, ease: SMOOTH }}
            className="hidden items-start justify-center md:flex md:px-7"
          />
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
      />
    </>
  );
}

export default memo(Header);
