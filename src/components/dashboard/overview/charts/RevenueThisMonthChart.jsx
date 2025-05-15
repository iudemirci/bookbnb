import ChartCard from './ChartCard.jsx';
import { groupBy, sumBy } from 'lodash';
import { useConvertedPrice } from '../../../../hooks/useConvertedPrice.js';
import { Flex } from 'antd';
import dayjs from 'dayjs';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useTranslation } from 'react-i18next';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const now = dayjs();
const startOfMonth = now.startOf('month');
const endOfMonth = now.endOf('month');

function RevenueThisMonthChart({ reservations }) {
  const { t } = useTranslation('dashboard');
  const thisMonthReservations = reservations?.filter((reservation) => {
    const [from, to] = reservation.date;
    const startDate = dayjs(from);
    const endDate = dayjs(to);

    return endDate.isAfter(startOfMonth, 'day') && startDate.isBefore(endOfMonth, 'day');
  });

  const groupedCurrencies = groupBy(thisMonthReservations, 'currency');
  const totalsByCurrency = Object.entries(groupedCurrencies).reduce((acc, [currency, items]) => {
    acc[currency] = sumBy(items, (item) => Number(item.price));
    return acc;
  }, {});

  const { data: convertedAmount } = useConvertedPrice({
    amount: totalsByCurrency['TRY'],
    fromCurrency: 'TRY',
    toCurrency: 'USD',
  });
  const totalRevenue = (convertedAmount || 0) + (totalsByCurrency['USD'] || 0);

  const formatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: '1',
  }).format(totalRevenue);

  return (
    <ChartCard title={t('revenue_this_month')}>
      <Flex vertical align='center' justify='center' className='text-primary/60 absolute inset-0'>
        <Flex align='center'>
          <span className='text-5xl'>$</span>
          <span className='text-8xl font-extrabold'>{formatted}</span>
        </Flex>
      </Flex>
    </ChartCard>
  );
}

export default RevenueThisMonthChart;
