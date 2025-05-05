import dayjs from 'dayjs';
import { t } from 'i18next';

export function getElapsedHostingTime(isoDate) {
  const start = dayjs(isoDate);
  const now = dayjs();

  const units = [
    { key: 'year', diff: now.diff(start, 'year') },
    { key: 'month', diff: now.diff(start, 'month') },
    { key: 'week', diff: now.diff(start, 'week') },
    { key: 'day', diff: now.diff(start, 'day') },
    { key: 'hour', diff: now.diff(start, 'hour') },
    { key: 'minute', diff: now.diff(start, 'minute') },
    { key: 'second', diff: now.diff(start, 'second') },
  ];

  for (const unit of units) {
    if (unit.diff >= 1) {
      return t(`details:hosting_duration.${unit.key}`, { count: unit.diff });
    }
  }

  return t('details:hosting_duration.second', { count: 0 });
}
