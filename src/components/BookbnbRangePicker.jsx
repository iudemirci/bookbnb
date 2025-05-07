import dayjs from 'dayjs';
import { DatePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../store/appSlice.js';
import { Typography } from 'antd';
import clsx from 'clsx';
import { useGetReservationDates } from '../hooks/reservation/useGetReservationDates.js';
import { useParams } from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';
import { getDisabledDatesSet } from '../utils/getDisabledDatesSet.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useTranslation } from 'react-i18next';
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

function BookbnbRangePicker({ className }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dateRange = useSelector((state) => state.app.dateRange);
  const { t } = useTranslation('details');

  const { data: reservations } = useGetReservationDates(id);

  const disabledDatesSet = getDisabledDatesSet(reservations);

  const hasOverlap = useCallback(
    (start, end) => {
      let current = start.clone();
      while (current.isSameOrBefore(end, 'day')) {
        const dateStr = current.format('YYYY-MM-DD');
        if (disabledDatesSet.has(dateStr)) {
          return true;
        }
        current = current.add(1, 'day');
      }
      return false;
    },
    [disabledDatesSet],
  );

  const handleDateChange = useCallback(
    (dates) => {
      if (!dates || dates.length !== 2) {
        dispatch(setDateRange(null));
        return;
      }

      const [startDate, endDate] = dates;

      // is overlapping
      if (hasOverlap(startDate, endDate)) {
        message.warning(t('reservation_overlap'));
        dispatch(setDateRange(null));
        return;
      }

      dispatch(setDateRange([startDate.toISOString(), endDate.toISOString()]));
    },
    [dispatch, hasOverlap, t],
  );

  const disabledDate = useCallback(
    (current) => {
      const today = dayjs().startOf('day');
      const dateStr = current.format('YYYY-MM-DD');
      return current.isBefore(today) || disabledDatesSet.has(dateStr);
    },
    [disabledDatesSet],
  );

  const parsedValue = useMemo(
    () => (dateRange?.length === 2 ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : undefined),
    [dateRange],
  );

  return (
    <div className='internal-label-select-wrapper w-full'>
      <RangePicker
        value={parsedValue}
        onChange={handleDateChange}
        disabledDate={disabledDate}
        format='DD/MM/YYYY'
        placeholder={[t('add_date'), t('add_date')]}
        allowClear={false}
        inputReadOnly
        size='large'
        picker='date'
        suffixIcon={null}
        separator={<div className='absolute top-0 left-[46%] mx-2 h-full w-px bg-black' />}
        popupClassName='mobile-range-picker'
        className={clsx(
          'internal-label-rangepicker w-full cursor-pointer px-4 py-2 text-base shadow-sm hover:!border-black',
          className,
        )}
      />
      <Typography.Text className='internal-label internal-label-left'>{t('check-in')}</Typography.Text>
      <Typography.Text className='internal-label internal-label-right'>{t('check-out')}</Typography.Text>
    </div>
  );
}

export default memo(BookbnbRangePicker);
