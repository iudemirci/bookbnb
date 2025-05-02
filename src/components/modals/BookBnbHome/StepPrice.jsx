import StepTitle from './StepTitle.jsx';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

function StepPrice({ currency = 'USD' }) {
  const symbols = {
    USD: '$',
    TRY: '₺',
  };
  const symbol = symbols[currency] || '';
  const { t } = useTranslation('bookbnb');
  return (
    <div>
      <StepTitle title={t('price_title')} subtitle={t('price_subtitle')} />

      <Form.Item name='price' className='!my-4'>
        <InputNumber
          min={0}
          step={10}
          size='large'
          style={{ width: '100%' }}
          formatter={(val) => `${symbol} ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(val) => val.replace(/[^\d.-]/g, '')}
        />
      </Form.Item>
    </div>
  );
}

export default StepPrice;
