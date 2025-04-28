import { Icon } from "@iconify/react";
import { useCallback, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Navigation } from "swiper/modules";

import Container from "../Container.jsx";
import CarouselButtons from "../CarouselButtons.jsx";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { headerTabs } from "../../data/headerTabs.js";

function HeaderCarousel() {
  const [selectedTab, setSelectedTab] = useState(headerTabs[0].label);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = useCallback((swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <Swiper
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
      className={clsx(
        "relative overflow-hidden",
        "before:from-bg-primary before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-25 before:bg-gradient-to-r before:to-transparent before:transition-opacity",
        "after:from-bg-primary after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-25 after:bg-gradient-to-l after:to-transparent after:transition-opacity",
        !isBeginning ? "before:opacity-100" : "before:opacity-0",
        !isEnd ? "after:opacity-100" : "after:opacity-0",
      )}
    >
      {headerTabs.map(({ label, icon }, idx) => (
        <SwiperSlide
          key={idx}
          className={clsx(
            "group/slide relative my-2 !flex max-w-15 cursor-pointer flex-col !items-center !justify-center gap-1 rounded-lg py-2 duration-300 first:pl-0 last:pr-0",
            selectedTab === label ? "text-black" : "text-gray-500",
          )}
          onClick={() => setSelectedTab(label)}
        >
          <Icon icon={icon} width="28" height="28" />
          <span className="text-sm font-bold text-nowrap">{label}</span>
          <span
            className={clsx(
              "absolute bottom-0 left-0 h-[1.5px] w-full duration-300",
              selectedTab === label
                ? "bg-black"
                : "bg-transparent group-hover/slide:bg-gray-300",
            )}
          />
        </SwiperSlide>
      ))}

      <CarouselButtons isBeginning={isBeginning} isEnd={isEnd} type="header" />
    </Swiper>
  );
}

export default HeaderCarousel;
