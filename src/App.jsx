import Router from './routes/Router.jsx';
import useSession from './hooks/auth/useSession.js';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/tr';
import { useEffect } from 'react';
import i18n from 'i18next';

function App() {
  useSession();

  useEffect(() => {
    const lang = i18n.language === 'en' ? 'en' : 'tr';
    dayjs.locale(lang);
  }, [i18n.language]);

  return <Router />;
}

export default App;
