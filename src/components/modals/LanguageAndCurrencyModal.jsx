import { Col, Modal, Row, Space, Tabs, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLanguageAndCurrencyOpen } from '../../store/modalSlice.js';
import clsx from 'clsx';
import { setCurrency } from '../../store/appSlice.js';

function LanguageAndCurrencyModal() {
  const isModalOpen = useSelector((state) => state.modal.isLanguageAndCurrencyOpen);
  const currentCurrency = useSelector((state) => state.app.currency);
  const currentLocalCurrency = localStorage.getItem('currency');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const languages = useMemo(() => {
    return [
      { language: 'English', country: 'United States', code: 'en' },
      { language: 'Turkish', country: 'Türkiye', code: 'tr' },
    ];
  }, []);

  const currencies = useMemo(() => {
    return [
      { currency: 'United States Dollar', abbr: '$ Dollar', code: 'USD' },
      { currency: 'Turkish Lira', abbr: '₺ TRY', code: 'TRY' },
    ];
  }, []);

  const handleLanguage = useCallback(
    (lang) => {
      if (lang === 'tr') {
        localStorage.setItem('locale', 'tr');
      } else {
        localStorage.setItem('locale', 'en');
      }
      i18n.changeLanguage(lang === 'tr' ? 'tr' : 'en');
    },
    [i18n],
  );

  const handleCurrency = useCallback(
    (currency) => {
      if (currency === 'TRY') {
        localStorage.setItem('currency', 'TRY');
      } else {
        localStorage.setItem('currency', 'USD');
      }

      dispatch(setCurrency(currency === 'TRY' ? 'TRY' : 'USD'));
    },
    [dispatch],
  );

  const items = useMemo(() => {
    return [
      {
        key: '1',
        label: t('language_region'),
        children: (
          <Space direction='vertical' size={16} className='w-full'>
            <Typography.Title level={2}>{t('choose_language_title')}</Typography.Title>
            <Row gutter={[12, 12]} role='list' wrap={false}>
              {languages.map(({ language, country, code }) => (
                <Col key={code} role='listitem' className='min-w-35 flex-1'>
                  <button
                    className={clsx(
                      'hover:bg-bg-secondary flex w-full cursor-pointer flex-col rounded-lg px-4 py-1.5 text-start text-nowrap',
                      i18n.language === code && 'border',
                    )}
                    onClick={() => handleLanguage(code)}
                  >
                    <Typography.Text className='text-text-secondary'>{language}</Typography.Text>
                    <Typography.Text type='secondary'>{country}</Typography.Text>
                  </button>
                </Col>
              ))}
            </Row>
          </Space>
        ),
      },
      {
        key: '2',
        label: t('currency'),
        children: (
          <Space direction='vertical' size={16} className='w-full'>
            <Typography.Title level={2}>{t('choose_currency')}</Typography.Title>
            <Row gutter={[12, 12]} role='list' wrap={false}>
              {currencies.map(({ currency, abbr, code }) => (
                <Col key={code} role='listitem' className='min-w-35 flex-1'>
                  <button
                    className={clsx(
                      'hover:bg-bg-secondary flex w-full cursor-pointer flex-col rounded-lg px-4 py-1.5 text-start text-nowrap',
                      (currentCurrency || currentLocalCurrency) === code && 'border',
                    )}
                    onClick={() => handleCurrency(code)}
                  >
                    <Typography.Text className='text-text-secondary truncate'>{currency}</Typography.Text>
                    <Typography.Text type='secondary'>{abbr}</Typography.Text>
                  </button>
                </Col>
              ))}
            </Row>
          </Space>
        ),
      },
    ];
  }, [t, handleLanguage, i18n, languages, currencies, handleCurrency, currentCurrency, currentLocalCurrency]);

  function hideModal() {
    dispatch(setIsLanguageAndCurrencyOpen());
  }

  return (
    <Modal open={isModalOpen} onCancel={hideModal} width={410} footer={null}>
      <Tabs
        defaultActiveKey='1'
        items={items}
        indicator={{
          origin: '30',
        }}
      />
    </Modal>
  );
}

export default LanguageAndCurrencyModal;
