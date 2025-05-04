import dayjs from 'dayjs';
import { DatePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../../store/appSlice.js';
import { Typography } from 'antd';

const { RangePicker } = DatePicker;

function BookbnbCalendar({ onChange }) {
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;

      if (endDate.isBefore(startDate, 'day')) {
        message.warning('Check-out date cannot be before Check-in date.');
        dispatch(setDateRange(null));
      } else {
        dispatch(setDateRange([startDate.toISOString(), endDate.toISOString()]));
      }
    }
  };

  return (
    <div className='internal-label-select-wrapper w-full'>
      <RangePicker
        onChange={handleDateChange}
        disabledDate={(current) => current && current < dayjs().add(1, 'day').startOf('day')}
        format='DD/MM/YYYY'
        placeholder={['Add date', 'Add date']}
        allowClear={false}
        inputReadOnly
        size='large'
        picker='date'
        suffixIcon={null}
        separator={<div className='absolute top-0 left-[46%] mx-2 h-full w-px bg-black' />}
        popupClassName='mobile-range-picker'
        className='internal-label-rangepicker w-full cursor-pointer !rounded-b-none !border-b-0 px-4 py-2 text-base shadow-sm hover:!border-black'
      />
      <Typography.Text className='internal-label internal-label-left'>CHECK-IN</Typography.Text>
      <Typography.Text className='internal-label internal-label-right'>CHECK-OUT</Typography.Text>
    </div>
  );
}

export default BookbnbCalendar;
