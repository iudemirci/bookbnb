import { Icon } from "@iconify/react";
import { Dropdown, Flex, Typography } from "antd";

const menuItems = [
  {
    key: "signup",
    label: <Typography.Text>Sign up</Typography.Text>,
  },
  {
    key: "login",
    label: <Typography.Text>Log in</Typography.Text>,
  },
  {
    type: "divider",
  },
  {
    key: "host",
    label: <Typography.Text>Bookbnb your home</Typography.Text>,
  },
  {
    key: "help",
    label: <Typography.Text>Help Center</Typography.Text>,
  },
];

function HeaderAccount() {
  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
      getPopupContainer={() => document.getElementById("test")}
    >
      <Flex
        id="test"
        align="center"
        justify="center"
        gap={6}
        className="!ml-2 cursor-pointer rounded-full border border-gray-300/70 !px-3 !py-2 duration-300 hover:shadow-md"
      >
        <Icon icon="material-symbols:menu-rounded" width={20} />
        <Icon
          icon="mdi:account-circle"
          width={32}
          className="text-text-secondary"
        />
      </Flex>
    </Dropdown>
  );
}

export default HeaderAccount;
