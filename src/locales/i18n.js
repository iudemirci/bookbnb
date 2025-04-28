import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./en.json";
import trTranslations from "./tr.json";

const storedLocale = localStorage.getItem("locale");
const defaultLocale = "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    tr: {
      translation: trTranslations,
    },
  },
  lng: storedLocale || defaultLocale,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("locale", lng);
});

export default i18n;
