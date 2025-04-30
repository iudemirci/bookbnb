import { Icon } from "@iconify/react";
import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

function HeaderPrices() {
  const { t } = useTranslation();
  return (
    <Flex align="center" justify="center" gap={4}>
      <Icon icon="entypo:price-tag" width={26} className="text-primary" />
      <Typography.Text className="font-bold">{t("price_fee")}</Typography.Text>
    </Flex>
  );
}

export default HeaderPrices;
