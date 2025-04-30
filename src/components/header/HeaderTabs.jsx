import { Flex, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SMOOTH } from "../../config/motionConfig.js";
import useHasScrolled from "../../hooks/useHasScrolled.js";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

function HeaderTabs() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const hasScrolled = useHasScrolled();
  const isLarge = useMediaQuery({ query: "(max-width: 1024px)" });
  const tabs = useMemo(() => {
    return [
      { label: t("explore"), to: "/" },
      { label: t("my_homes"), to: "/my-homes" },
    ];
  }, [t]);

  return (
    <motion.div
      initial={{ translateY: "-200%", opacity: 0 }}
      animate={{
        translateY: hasScrolled ? "-200%" : isLarge ? "180%" : 0,
        opacity: hasScrolled ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: SMOOTH }}
    >
      <Flex align="center" justify="center" gap={8}>
        {tabs.map(({ label, to }, idx) => (
          <Link key={idx} to={to}>
            <div className="px-4 py-2">
              <Typography.Text
                className={clsx(
                  "!text-xl duration-100",
                  pathname === to
                    ? "font-bold"
                    : "!text-text-secondary hover:text-text-primary",
                )}
              >
                {label}
              </Typography.Text>
            </div>
          </Link>
        ))}
      </Flex>
    </motion.div>
  );
}

export default HeaderTabs;
