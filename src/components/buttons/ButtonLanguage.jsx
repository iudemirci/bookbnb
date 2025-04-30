import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
<<<<<<< HEAD
import { Button } from "antd";
import LanguageAndCurrencyModal from "../modals/LanguageAndCurrencyModal.jsx";
import { useDispatch } from "react-redux";
import { setIsLanguageAndCurrencyOpen } from "../../store/modalSlice.js";

function ButtonLanguage({ text = true, className }) {
  const dispatch = useDispatch();
=======
import { useState } from "react";
import { Modal } from "antd";
import useBodyScrollOnModal from "../../hooks/useHeaderPaddingOnModal.jsx";
import useHeaderPaddingOnModal from "../../hooks/useHeaderPaddingOnModal.jsx";

function ButtonLanguage({ text = true, className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
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

  function showModal() {
    dispatch(setIsLanguageAndCurrencyOpen());
  }

  return (
    <>
      <Button
<<<<<<< HEAD
        type="text"
=======
        type="secondary"
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
        className={clsx("flex items-center justify-center gap-1", className)}
        onClick={showModal}
      >
        <Icon icon="material-symbols:language" width={22} />
<<<<<<< HEAD
        {text && (isEnglish ? "English(US)" : "Türkçe(TR)")}
      </Button>

      <LanguageAndCurrencyModal />
=======
        {text && (isEnglish ? "English(US)" : "Turkish(TR)")}
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel}></Modal>
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
    </>
  );
}

export default ButtonLanguage;
