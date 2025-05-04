import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from 'antd';
import LanguageAndCurrencyModal from '../modals/LanguageAndCurrencyModal.jsx';
import { useDispatch } from 'react-redux';
import { setIsLanguageAndCurrencyOpen } from '../../store/modalSlice.js';

function ButtonLanguage({ text = true, className }) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const isEnglish = localStorage.getItem('locale') === 'en' || i18n.language === 'en';

  function showModal() {
    dispatch(setIsLanguageAndCurrencyOpen('1'));
  }

  return (
    <>
      <Button type='text' className={clsx('flex items-center justify-center gap-1', className)} onClick={showModal}>
        <Icon icon='material-symbols:language' width={22} />
        {text && (isEnglish ? 'English(US)' : 'Türkçe(TR)')}
      </Button>

      <LanguageAndCurrencyModal />
    </>
  );
}

export default ButtonLanguage;
