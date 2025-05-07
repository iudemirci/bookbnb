import { useSelector } from 'react-redux';
import { useConvertedPrice } from '../../hooks/useConvertedPrice.js';
import { formatPrice } from '../../utils/bookingUtils.js';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
const { Text } = Typography;

function HomeCardPrice({ price, count = 5 }) {
  const { t } = useTranslation('details');
  const currency = useSelector((state) => state.app.currency);

  const { data: convertedPrice } = useConvertedPrice({
    amount: price,
    fromCurrency: 'USD',
    toCurrency: currency === 'USD' ? null : currency,
  });

  const finalPrice = (convertedPrice || price) * count;
  const formattedPrice = formatPrice(finalPrice, currency);
  return (
    <Text type='secondary'>
      <Text underline className='!font-bold'>
        {formattedPrice}
      </Text>{' '}
      {t('for_nights', { count: count })}
    </Text>
  );
}

export default memo(HomeCardPrice);
