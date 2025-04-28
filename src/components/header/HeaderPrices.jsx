import { Icon } from "@iconify/react";
import { Flex, Typography } from "antd";

function HeaderPrices() {
  return (
    <Flex align="center" justify="center" gap={4}>
      <Icon icon="entypo:price-tag" width={26} className="text-primary" />
      <Typography.Text className="font-bold">
        Prices include all fees
      </Typography.Text>
    </Flex>
  );
}

export default HeaderPrices;
