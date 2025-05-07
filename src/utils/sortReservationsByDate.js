import { orderBy, partition } from 'lodash';
import dayjs from 'dayjs';

export function sortReservationsByDate(reservations) {
  const now = dayjs();

  const [upcoming, past] = partition(reservations, (item) => dayjs(item.date[0]).isAfter(now));

  const sortedUpcoming = orderBy(upcoming, (item) => dayjs(item.date[0]).valueOf(), 'asc');
  const sortedPast = orderBy(past, (item) => dayjs(item.date[0]).valueOf(), 'asc');

  return [...sortedUpcoming, ...sortedPast];
}
