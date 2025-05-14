import { Button, Flex, message, Typography } from 'antd';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DotDivider from '../DotDivider.jsx';
import { calculateTotalPrice, formatDateRange, formatPrice, getStayDurationText } from '../../utils/bookingUtils.js';
import { useTranslation } from 'react-i18next';
import { useConvertedPrice } from '../../hooks/useConvertedPrice.js';
import { t } from 'i18next';
import { setIsConfirmationOpen, setIsLoginOpen } from '../../store/modalSlice.js';
import { setFinalForm } from '../../store/appSlice.js';

function FixedBarMobile({ price }) {
  const dateRange = useSelector((state) => state.app.dateRange);
  const currency = useSelector((state) => state.app.currency);

  const { data: convertedPrice } = useConvertedPrice({
    amount: price,
    fromCurrency: 'USD',
    toCurrency: currency === 'USD' ? null : currency,
  });

  const finalPrice = calculateTotalPrice(convertedPrice || price, dateRange);
  const guestsValue = useSelector((state) => state.app.guests);
  const user = useSelector((state) => state.auth.user);
  const formattedPrice = formatPrice(finalPrice, currency);
  const durationText = getStayDurationText(dateRange);
  const formattedDateRange = formatDateRange(dateRange);
  const dispatch = useDispatch();
  const { t } = useTranslation('details');

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
    <Flex
      align='center'
      justify='space-between'
      className='bg-bg-primary border-border-grey fixed bottom-0 !z-100 !flex w-full border-t !p-6 md:!hidden'
    >
      <Flex vertical={true}>
        <Typography.Text className='!font-extrabold underline'>{formattedPrice}</Typography.Text>
        <Typography.Text className='!text-sm' type='secondary'>
          {t('details:for_duration', { duration: durationText })}
          {formattedDateRange && <DotDivider className='text-text-secondary px-1' />}
          {formattedDateRange}
        </Typography.Text>
      </Flex>

      <Button onClick={onFinish} type='primary' size='large' className='w-40'>
        {t('details:reserve')}
      </Button>
    </Flex>
  );
}

export default memo(FixedBarMobile);
