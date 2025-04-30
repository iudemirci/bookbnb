import { Icon } from "@iconify/react";
import { Flex, Typography } from "antd";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";

function HeaderPrices() {
  const { t } = useTranslation();
  return (
    <Flex align="center" justify="center" gap={4}>
      <Icon icon="entypo:price-tag" width={26} className="text-primary" />
      <Typography.Text className="font-bold">{t("price_fee")}</Typography.Text>
=======

function HeaderPrices() {
  return (
    <Flex align="center" justify="center" gap={4}>
      <Icon icon="entypo:price-tag" width={26} className="text-primary" />
      <Typography.Text className="font-bold">
        Prices include all fees
      </Typography.Text>
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
    </Flex>
  );
}

export default HeaderPrices;
