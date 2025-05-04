import { Button, Flex, Typography } from 'antd';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import DotDivider from '../DotDivider.jsx';
import { calculateTotalPrice, formatDateRange, getStayDurationText } from '../../utils/bookingUtils.js';

const formatPrice = (price, currency) => {
  const formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
};

function FixedBarMobile({ price }) {
  const dateRange = useSelector((state) => state.app.dateRange);
  const currency = useSelector((state) => state.app.currency);

  const finalPrice = calculateTotalPrice(price, dateRange);
  const formattedPrice = formatPrice(finalPrice, currency);
  const formattedDateRange = formatDateRange(dateRange);
  const durationText = getStayDurationText(dateRange);

  return (
    <Flex
      align='center'
      justify='space-between'
      className='bg-bg-primary border-border-grey fixed bottom-0 !z-100 !flex w-full border-t !p-6 md:!hidden'
    >
      <Flex vertical={true}>
        <Typography.Text className='!font-extrabold underline'>{formattedPrice}</Typography.Text>
        <Typography.Text className='!text-base' type='secondary'>
          for {durationText}
          {formattedDateRange && <DotDivider className='text-text-secondary px-1' />}
          {formattedDateRange}
        </Typography.Text>
      </Flex>

      <Button type='primary' size='large'>
        Reserve
      </Button>
    </Flex>
  );
}

export default memo(FixedBarMobile);
