import dayjs from 'dayjs';

export function getDateDiff(dateRange) {
  return dayjs(dateRange?.[1]).diff(dayjs(dateRange?.[0]), 'day') || null;
}
