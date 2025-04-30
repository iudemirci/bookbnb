import { Icon } from "@iconify/react";
<<<<<<< HEAD
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import ButtonsCarousel from "../buttons/ButtonsCarousel.jsx";
=======
import { useCallback, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Navigation } from "swiper/modules";

import Container from "../Container.jsx";
import CarouselButtons from "../CarouselButtons.jsx";
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { headerTabs } from "../../data/headerTabs.js";

function HeaderCarousel() {
  const [selectedTab, setSelectedTab] = useState(headerTabs[0].label);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
<<<<<<< HEAD
  const swiperRef = useRef(null);
  const { t } = useTranslation("tabs");

  const updateNavigationState = useCallback(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;
    if (!swiper) return;

=======

  const handleSlideChange = useCallback((swiper) => {
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <Swiper
<<<<<<< HEAD
      ref={swiperRef}
=======
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
      modules={[Mousewheel, FreeMode, Navigation]}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next",
      }}
      freeMode={true}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: false,
      }}
      slidesPerView="auto"
<<<<<<< HEAD
      spaceBetween={25}
      onSwiper={(swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);

        swiper.on("slideChange", updateNavigationState);
        swiper.on("resize", updateNavigationState);
        swiper.on("orientationchange", updateNavigationState);
        swiper.on("beforeTransitionStart", updateNavigationState);
        swiper.on("afterTransitionStart", updateNavigationState);
        swiper.on("fromEdge", updateNavigationState);
        swiper.on("toEdge", updateNavigationState);
        swiper.on("reachBeginning", () => setIsBeginning(true));
        swiper.on("reachEnd", () => setIsEnd(true));
      }}
      onSlideChange={updateNavigationState}
      onReachBeginning={() => setIsBeginning(true)}
      onReachEnd={() => setIsEnd(true)}
      onFromEdge={updateNavigationState}
=======
      spaceBetween={43}
      onSwiper={(swiper) => {
        swiper.on("setTranslate", () => {
          handleSlideChange(swiper);
        });
      }}
      onSliderMove={(swiper) => handleSlideChange(swiper)}
      onTouchMove={(swiper) => handleSlideChange(swiper)}
      onSlideChange={(swiper) => handleSlideChange(swiper)}
      onInit={(swiper) => {
        handleSlideChange(swiper);
      }}
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
      className={clsx(
        "relative overflow-hidden",
        "before:from-bg-primary before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-25 before:bg-gradient-to-r before:to-transparent before:transition-opacity",
        "after:from-bg-primary after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-25 after:bg-gradient-to-l after:to-transparent after:transition-opacity",
        !isBeginning ? "before:opacity-100" : "before:opacity-0",
        !isEnd ? "after:opacity-100" : "after:opacity-0",
      )}
    >
<<<<<<< HEAD
      {headerTabs.map(({ key, icon }, idx) => (
        <SwiperSlide
          key={idx}
          className={clsx(
            "group/slide relative my-2 !flex max-w-25 cursor-pointer flex-col !items-center !justify-center gap-1 rounded-lg py-2 duration-300 first:pl-0 last:pr-0",
            selectedTab === key ? "!text-black" : "!text-gray-500",
=======
      {headerTabs.map(({ label, icon }, idx) => (
        <SwiperSlide
          key={idx}
          className={clsx(
            "group/slide relative my-2 !flex max-w-15 cursor-pointer flex-col !items-center !justify-center gap-1 rounded-lg py-2 duration-300 first:pl-0 last:pr-0",
            selectedTab === label ? "text-black" : "text-gray-500",
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
          )}
          onClick={() => setSelectedTab(key)}
        >
          <Icon icon={icon} width="28" height="28" />
<<<<<<< HEAD
          <Typography.Text
            className={clsx(
              "!truncate !text-sm font-bold text-nowrap",
              selectedTab === key ? "!text-black" : "!text-gray-500",
            )}
          >
            {t(key)}
          </Typography.Text>
=======
          <span className="text-sm font-bold text-nowrap">{label}</span>
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
          <span
            className={clsx(
              "absolute bottom-0 left-0 h-[1.5px] w-full duration-300",
              selectedTab === key
                ? "bg-black"
                : "bg-transparent group-hover/slide:bg-gray-300",
            )}
          />
        </SwiperSlide>
      ))}

<<<<<<< HEAD
      <ButtonsCarousel isBeginning={isBeginning} isEnd={isEnd} type="header" />
=======
      <CarouselButtons isBeginning={isBeginning} isEnd={isEnd} type="header" />
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
    </Swiper>
  );
}

export default HeaderCarousel;
