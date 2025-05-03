import dayjs from 'dayjs';

export function getElapsedHostingTime(isoDate) {
  const start = dayjs(isoDate);
  const now = dayjs();

  const diffInYears = now.diff(start, 'year');
  if (diffInYears >= 1) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} of hosting`;
  }

  const diffInMonths = now.diff(start, 'month');
  if (diffInMonths >= 1) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} of hosting`;
  }

  const diffInWeeks = now.diff(start, 'week');
  if (diffInWeeks >= 1) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} of hosting`;
  }

  const diffInDays = now.diff(start, 'day');
  if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} of hosting`;
  }

  const diffInHours = now.diff(start, 'hour');
  if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} of hosting`;
  }

  const diffInMinutes = now.diff(start, 'minute');
  if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} of hosting`;
  }

  const diffInSeconds = now.diff(start, 'second');
  return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} of hosting`;
}
