import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { Icon } from "@iconify/react";
import clsx from "clsx";

function CategoryInput({ category, icon, isSelected }) {
  const { t } = useTranslation("tabs");
  return (
    <Flex
      vertical={true}
      gap={2}
      className={clsx(
        "border-border-grey cursor-pointer rounded-md border-2 !p-2 duration-200 hover:border-black/50 active:border-black",
        isSelected && "!border-black",
      )}
    >
      <Icon icon={icon} width={25} />
      <Typography.Text>{t(category)}</Typography.Text>
    </Flex>
  );
}

export default CategoryInput;
