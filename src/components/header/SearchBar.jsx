import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
<<<<<<< HEAD
import { Button, Col, Row } from "antd";

function SearchBar() {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "border-border-grey shadow-theme hover:shadow-theme-hover relative h-[56px] min-w-[290px] rounded-full border-[0.5px] px-2 duration-300 md:h-[50px]",
      )}
    >
      <Row
        align="center"
        justify="space-between"
        className="h-full"
        wrap={false}
      >
        <Col className="min-w-0">
          <button className="flex size-full cursor-pointer items-center !text-[15px]">
            <span className="truncate border-r px-4.5 font-bold">
              {t("search_anywhere")}
            </span>
          </button>
        </Col>
        <Col className="min-w-0">
          <button className="flex size-full cursor-pointer items-center !text-[15px]">
            <span className="truncate border-r px-4.5 font-bold">
              {t("search_anyweek")}
            </span>
          </button>
        </Col>
        <Col className="flex min-w-0 items-center justify-center">
          <button className="flex size-full cursor-pointer items-center px-4.5 !text-[15px]">
            <span className="text-text-secondary truncate">
              {t("search_guests")}
            </span>
          </button>
        </Col>
        <Col className="flex h-full items-center">
          {/*<div className="bg-primary flex size-9 cursor-pointer items-center justify-center rounded-full">*/}
          {/*  <Icon icon="mdi:magnify" className="text-white" width={18} />*/}
          {/*</div>*/}
          <Button type="primary">
            <Icon icon="mdi:magnify" className="text-white" width={15} />
          </Button>
        </Col>
      </Row>
    </div>
=======
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
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
  );
}

export default SearchBar;
