import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { motion } from "framer-motion";
import { SMOOTH } from "../../config/motionConfig.js";
import useHasScrolled from "../../hooks/useHasScrolled.js";

function SearchBar() {
  const { t } = useTranslation();
  const hasScrolled = useHasScrolled();

  return (
    <motion.div
      animate={{ translateY: hasScrolled ? "-130%" : 0 }}
      transition={{ duration: 0, ease: SMOOTH }}
      className={clsx(
        "border-border-grey shadow-search relative h-[56px] rounded-full border-[0.5px] px-2 duration-300 md:h-[50px] md:shadow-md",
        hasScrolled ? "-translate-x-33 lg:translate-x-0" : "translate-x-0",
      )}
    >
      <Flex align="center" justify="space-between" className="h-full">
        <button className="h-full cursor-pointer !text-[15px]">
          <span className="border-r px-4.5 font-bold">Anywhere</span>
        </button>
        <button className="h-full cursor-pointer !text-[15px]">
          <span className="border-r px-4.5 font-bold">Any week</span>
        </button>
        <button className="cursor-pointe !text-[15px]r h-full">
          <span className="text-text-secondary px-4.5">Add guests</span>
        </button>
        <div className="bg-primary flex size-9 cursor-pointer items-center justify-center rounded-full">
          <Icon icon="mdi:magnify" className="text-white" width={18} />
        </div>
      </Flex>
    </motion.div>
  );
}

export default SearchBar;
