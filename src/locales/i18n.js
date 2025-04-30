import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./en/common.json";
import trCommon from "./tr/common.json";
import enTabs from "./en/tabs.json";
import trTabs from "./tr/tabs.json";
import enFooter from "./en/footer.json";
import trFooter from "./tr/footer.json";

const storedLocale = localStorage.getItem("locale");
const defaultLocale = "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enCommon,
      tabs: enTabs,
      footer: enFooter,
    },
    tr: {
      translation: trCommon,
      tabs: trTabs,
      footer: trFooter,
    },
  },
  lng: storedLocale || defaultLocale,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  ns: ["translation", "tabs", "footer"],
  defaultNS: "translation",
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("locale", lng);
});

export default i18n;
