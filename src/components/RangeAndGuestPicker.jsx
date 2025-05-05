import BookbnbRangePicker from './BookbnbRangePicker.jsx';
import { Flex, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setGuests } from '../store/appSlice.js';
import { useTranslation } from 'react-i18next';

function RangeAndGuestPicker({ guests }) {
  const { t } = useTranslation('details');
  const dispatch = useDispatch();
  const guestsValue = useSelector((state) => state.app.guests);

  const guestOptions = [...Array(guests)].map((_, idx) => {
    const count = idx + 1;
    return {
      value: count,
      label: idx <= 0 ? t('guest', { count }) : t('guest_plural', { count }),
    };
  });

  function handleSelect(e) {
    dispatch(setGuests(e));
  }

  return (
    <Flex vertical={true} className='outline-primary rounded-t-lg focus:outline'>
      <BookbnbRangePicker className='!rounded-b-none !border-b-0' />

      <div className='internal-label-rangepicker-wrapper relative w-full'>
        <Select
          value={guestsValue}
          size='large'
          placeholder={guestOptions[0].label}
          popupClassName='!rounded-b-none'
          className='internal-label-select absolute !h-[50px] w-full !rounded-b-lg !border-black'
          dropdownStyle={{ fontSize: '14px' }}
          options={guestOptions}
          onChange={handleSelect}
        />
        <Typography.Text className='internal-label-select-label'>{t('guests')}</Typography.Text>
      </div>
    </Flex>
  );
}

export default RangeAndGuestPicker;
