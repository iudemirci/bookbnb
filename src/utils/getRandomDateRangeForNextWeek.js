import dayjs from 'dayjs';

export function getRandomDateRangeForNextWeek() {
  const today = dayjs();
  const nextWeekStart = today.startOf('week').add(1, 'week').add(1, 'day');
  const nextWeekEnd = nextWeekStart.add(6, 'day');

  const maxStartOffset = nextWeekEnd.diff(nextWeekStart, 'day') - 4;
  const randomStartOffset = Math.floor(Math.random() * (maxStartOffset + 1));

  const startDate = nextWeekStart.add(randomStartOffset, 'day');
  const endDate = startDate.add(4, 'day');

  return `${startDate.format('D')}–${endDate.format('D MMMM')}`;
}
