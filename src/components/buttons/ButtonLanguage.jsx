import Button from "./Button.jsx";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useState } from "react";
import { Modal } from "antd";
import useBodyScrollOnModal from "../../hooks/useHeaderPaddingOnModal.jsx";
import useHeaderPaddingOnModal from "../../hooks/useHeaderPaddingOnModal.jsx";

function ButtonLanguage({ text = true, className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const isEnglish =
    localStorage.getItem("locale") === "en" || i18n.language === "en";
  useHeaderPaddingOnModal(isModalOpen);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleClick(e) {
    e.stopPropagation();

    if (i18n.language === "en") {
      localStorage.setItem("locale", "tr");
    } else {
      localStorage.setItem("locale", "en");
    }
    i18n.changeLanguage(i18n.language === "en" ? "tr" : "en");
  }

  return (
    <>
      <Button
        type="secondary"
        className={clsx("flex items-center justify-center gap-1", className)}
        onClick={showModal}
      >
        <Icon icon="material-symbols:language" width={22} />
        {text && (isEnglish ? "English(US)" : "Turkish(TR)")}
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel}></Modal>
    </>
  );
}

export default ButtonLanguage;
