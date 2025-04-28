import Button from "./Button.jsx";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

function ButtonLanguage() {
  const { i18n } = useTranslation();
  const isEnglish =
    localStorage.getItem("locale") === "en" || i18n.language === "en";

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
    <Button
      className="flex items-center justify-center gap-1"
      onClick={handleClick}
    >
      <Icon icon="material-symbols-light:language" width={22} />
      {isEnglish ? "English(US)" : "Turkish(TR)"}{" "}
    </Button>
  );
}

export default ButtonLanguage;
