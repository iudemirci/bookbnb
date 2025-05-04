import dayjs from 'dayjs';
import { getDateDiff } from './getDateDiff.js';

export const formatPrice = (price, currency, locale = 'tr-TR') => {
  if (price === null || price === undefined || currency === null || currency === undefined) {
    return '';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
};

export const calculateTotalPrice = (price, dateRange) => {
  if (!price) return 0;

  const duration = getDateDiff(dateRange);
  return duration ? duration * price : price;
};

export const formatDateRange = (dateRange, format = 'MMM D') => {
  if (!dateRange || !dateRange[0] || !dateRange[1]) {
    return '';
  }

  const startDate = dayjs(dateRange[0]).format(format);
  const endDate = dayjs(dateRange[1]).format('D');

  return `${startDate}-${endDate}`;
};

export const getStayDurationText = (dateRange) => {
  const duration = getDateDiff(dateRange) || 1;
  return `${duration} night${duration > 1 ? 's' : ''}`;
};
