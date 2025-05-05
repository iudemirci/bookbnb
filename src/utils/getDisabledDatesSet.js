import dayjs from 'dayjs';

export const getDisabledDatesSet = (reservations = []) => {
  const disabled = new Set();

  reservations.forEach(([start, end]) => {
    let current = dayjs(start);
    const endDate = dayjs(end);

    while (current.isSame(endDate) || current.isBefore(endDate)) {
      disabled.add(current.format('YYYY-MM-DD'));
      current = current.add(1, 'day');
    }
  });

  return disabled;
};
