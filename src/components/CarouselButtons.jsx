import clsx from "clsx";
import { Icon } from "@iconify/react";

function CarouselButtons({ isBeginning, isEnd, type = "list" }) {
  const types = {
    list: "opacity-0 group-hover:opacity-100",
    header:
      "bg-bg-primary-hover border border-gray-400 hover:shadow-md active:shadow-md shadow-text-secondary/30",
  };

  return (
    <>
      <div
        className={clsx(
          "custom-prev bg-bg-primary-hover absolute top-1/2 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full duration-200",
          types[type],
          type === "list" ? "left-3" : "left-0",
          isBeginning && "pointer-events-none !opacity-0",
        )}
      >
        <Icon icon="mdi-light:arrow-left" width={20} height={20} />
      </div>
      <div
        className={clsx(
          "custom-next bg-bg-primary-hover absolute top-1/2 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full duration-200",
          types[type],
          type === "list" ? "right-3" : "right-0",
          isEnd && "pointer-events-none !opacity-0",
        )}
      >
        <Icon icon="mdi-light:arrow-right" width={20} height={20} />
      </div>
    </>
  );
}

export default CarouselButtons;
