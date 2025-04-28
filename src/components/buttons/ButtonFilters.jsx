import { Icon } from "@iconify/react";
import { Flex } from "antd";

function ButtonFilters() {
  return (
    <button className="border-border-grey hover:bg-bg-secondary !mx-4 cursor-pointer rounded-xl border px-4.5 py-4.5 duration-300 hover:border-black active:border-black active:bg-gray-200 active:duration-75">
      <Flex align="center" justify="center" gap={6}>
        <Icon icon="mage:filter" width={18} />
        Filters
      </Flex>
    </button>
  );
}

export default ButtonFilters;
