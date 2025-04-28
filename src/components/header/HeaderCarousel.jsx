import { Flex } from "antd";
import { headerTabs } from "../../data/headerTabs.js";
import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";

function HeaderCarousel() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Flex
      align="center"
      gap={16}
      className="overflow-x-auto"
      style={{
        scrollbarWidth: "none",
      }}
    >
      {headerTabs.map(({ label, icon }, idx) => (
        <div
          key={idx}
          className={clsx(
            "group relative my-2 flex cursor-pointer flex-col items-center justify-center rounded-lg px-3 py-2 duration-300",
            selectedTab === label ? "text-black" : "text-gray-500",
          )}
          onClick={() => setSelectedTab(label)}
        >
          <Icon icon={icon} width="28" height="28" />
          <span className="text-xs text-nowrap">{label}</span>
          <span
            className={clsx(
              "absolute bottom-0 left-0 h-[1.5px] w-full duration-300",
              selectedTab === label
                ? "bg-black"
                : "bg-transparent group-hover:bg-gray-300",
            )}
          />
        </div>
      ))}
    </Flex>
  );
}

export default HeaderCarousel;
