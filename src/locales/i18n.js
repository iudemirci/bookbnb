import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './en/common.json';
import trCommon from './tr/common.json';
import enTabs from './en/categories.json';
import trTabs from './tr/categories.json';
import enFooter from './en/footer.json';
import trFooter from './tr/footer.json';
import enBookbnb from './en/bookbnb.json';
import trBookbnb from './tr/bookbnb.json';
import enDetails from './en/details.json';
import trDetails from './tr/details.json';
import enDashboard from './en/dashboard.json';
import trDashboard from './tr/dashboard.json';

const storedLocale = localStorage.getItem('locale');
const defaultLocale = 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enCommon,
      tabs: enTabs,
      bookbnb: enBookbnb,
      footer: enFooter,
      details: enDetails,
      dashboard: enDashboard,
    },
    tr: {
      translation: trCommon,
      tabs: trTabs,
      bookbnb: trBookbnb,
      footer: trFooter,
      details: trDetails,
      dashboard: trDashboard,
    },
  },
  lng: storedLocale || defaultLocale,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
    pluralSeparator: '_',
  },
  pluralization: true,
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  ns: ['translation', 'tabs', 'footer'],
  defaultNS: 'translation',
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('locale', lng);
});

export default i18n;
