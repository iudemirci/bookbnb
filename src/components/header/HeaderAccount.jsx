import { Icon } from "@iconify/react";
import { Dropdown, Flex, Typography } from "antd";
<<<<<<< HEAD
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setIsSignupOpen } from "../../store/modalSlice.js";
import SignupModal from "../modals/SignupModal.jsx";

function HeaderAccount() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const menuItems = useMemo(() => {
    return [
      {
        key: "signup",
        label: <Typography.Text>{t("sign_up")}</Typography.Text>,
        onClick: () => {
          dispatch(setIsSignupOpen());
        },
      },
      {
        key: "login",
        label: <Typography.Text>{t("login")}</Typography.Text>,
        onClick: () => {
          console.log("Login clicked");
        },
      },
      {
        type: "divider",
      },
      {
        key: "host",
        label: <Typography.Text>{t("bookbnb_your_home")}</Typography.Text>,
        onClick: () => {
          console.log("Become a host clicked");
        },
      },
    ];
  }, [t]);

  return (
    <>
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

      <SignupModal />
    </>
=======

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
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
  );
}

export default HeaderAccount;
