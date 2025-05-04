import { Button, Card, Flex, Select, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

import { calculateTotalPrice, formatDateRange, formatPrice, getStayDurationText } from '../../utils/bookingUtils.js';
import BookbnbCalendar from './BookbnbCalendar.jsx';
const { Title, Text } = Typography;

function PriceCard({ price, guests }) {
  const dateRange = useSelector((state) => state.app.dateRange);
  const currency = useSelector((state) => state.app.currency);

  const finalPrice = calculateTotalPrice(price, dateRange);
  const formattedPrice = formatPrice(finalPrice, currency);
  const durationText = getStayDurationText(dateRange);

  const guestOptions = [...Array(guests)].map((num, idx) => ({
    value: idx + 1,
    label: `${idx + 1} guest${idx + 1 > 1 ? 's' : ''}`,
  }));

  return (
    <Card className='!cursor-auto shadow-md' hoverable>
      <Space direction='vertical' size={24} className='w-full'>
        <Flex vertical={true}>
          <Title className='!font-extrabold underline'>{formattedPrice}</Title>
          <Text>for {durationText}</Text>
        </Flex>

        <Flex vertical={true}>
          <BookbnbCalendar />
          <div className='internal-label-rangepicker-wrapper relative w-full'>
            <Select
              size='large'
              placeholder={guestOptions[0].label}
              popupClassName='!rounded-b-none'
              className='internal-label-select absolute !h-[50px] w-full !rounded-b-lg !border-black'
              dropdownStyle={{ fontSize: '14px' }}
              options={guestOptions}
            />
            <Typography.Text className='internal-label-select-label'>GUESTS</Typography.Text>
          </div>
        </Flex>
        <Button type='primary' size='large' className='w-full'>
          Reserve
        </Button>
      </Space>
    </Card>
  );
}

export default PriceCard;
