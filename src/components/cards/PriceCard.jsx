import { Button, Card, Flex, Form, message, Skeleton, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { calculateTotalPrice, formatPrice, getStayDurationText } from '../../utils/bookingUtils.js';
import RangeAndGuestPicker from '../RangeAndGuestPicker.jsx';
import { useConvertedPrice } from '../../hooks/useConvertedPrice.js';
import { memo, useCallback } from 'react';
import { setIsConfirmationOpen, setIsLoginOpen } from '../../store/modalSlice.js';
import { setFinalForm } from '../../store/appSlice.js';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography;

function PriceCard({ price, guests }) {
  const { t } = useTranslation('details');
  const dateRange = useSelector((state) => state.app.dateRange);
  const currency = useSelector((state) => state.app.currency);

  const { data: convertedPrice } = useConvertedPrice({
    amount: price,
    fromCurrency: 'USD',
    toCurrency: currency === 'USD' ? null : currency,
  });

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const guestsValue = useSelector((state) => state.app.guests);
  const finalPrice = calculateTotalPrice(convertedPrice || price, dateRange);
  const formattedPrice = formatPrice(finalPrice, currency);
  const durationText = getStayDurationText(dateRange);

  const onFinish = useCallback(() => {
    if (!user) {
      return dispatch(setIsLoginOpen());
    }

    switch (true) {
      case !dateRange:
        return message.warning(t('select_date_warning'));
      case !guestsValue:
        return message.warning(t('select_guests_warning'));
      default:
        dispatch(setFinalForm({ date: dateRange, guests: guestsValue, price: finalPrice, currency: currency }));
        dispatch(setIsConfirmationOpen());
    }
  }, [dispatch, guestsValue, dateRange, finalPrice, t, user, currency]);

  return (
    <Card className='!cursor-auto shadow-md' hoverable>
      <Space direction='vertical' size={24} className='w-full'>
        <Flex vertical={true}>
          <Title className='!font-extrabold underline'>{formattedPrice}</Title>
          <Text>{t('for_duration', { duration: durationText })}</Text>
        </Flex>

        <RangeAndGuestPicker guests={guests} />

        <Button onClick={onFinish} type='primary' size='large' className='w-full'>
          {t('reserve')}
        </Button>
      </Space>
    </Card>
  );
}

export default memo(PriceCard);
