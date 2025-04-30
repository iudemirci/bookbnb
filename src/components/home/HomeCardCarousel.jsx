import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
<<<<<<< HEAD
import { useCallback, useRef, useState } from "react";
=======
import { useCallback, useState } from "react";
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
import clsx from "clsx";
import { Navigation, Pagination, Mousewheel, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
<<<<<<< HEAD
import ButtonsCarousel from "../buttons/ButtonsCarousel.jsx";
import { memo } from "motion";
=======
import CarouselButtons from "../CarouselButtons.jsx";
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588

const imgArr = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1440",
  "https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/13e499ae-2fcb-4ef5-98ce-59835c5824ba.jpeg?im_w=1440",
  "https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/7f42159b-c244-4e00-9d06-45d0782642ea.jpeg?im_w=1440",
  "https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/d6ade790-3571-4759-b31e-f33efedfdd1e.jpeg?im_w=1440",
  "https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/f453d476-beb3-4402-8c88-298a26cdcd53.jpeg?im_w=1440",
];

function HomeCardCarousel() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
<<<<<<< HEAD
  const swiperRef = useRef(null);

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
    <div className="size-full overflow-hidden rounded-3xl">
      <Swiper
<<<<<<< HEAD
        ref={swiperRef}
=======
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
        modules={[Navigation, Pagination, Mousewheel, FreeMode]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        onSwiper={(swiper) => {
<<<<<<< HEAD
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
        pagination={{ clickable: true }}
        grabCursor={false}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        simulateTouch={true}
        allowTouchMove={window.innerWidth < 768}
        noSwiping={false}
        touchRatio={1}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: false,
        }}
        resistance={true}
        resistanceRatio={0}
        className="group relative size-full cursor-pointer"
      >
        {imgArr.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt="slide img"
              className="pointer-events-none size-full bg-black object-cover object-center select-none"
            />
          </SwiperSlide>
        ))}

<<<<<<< HEAD
        <ButtonsCarousel isBeginning={isBeginning} isEnd={isEnd} />
=======
        <CarouselButtons isBeginning={isBeginning} isEnd={isEnd} />
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
      </Swiper>
    </div>
  );
}

<<<<<<< HEAD
export default memo(HomeCardCarousel);
=======
export default HomeCardCarousel;
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
