import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import ChartCard from './ChartCard.jsx';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

function ReservationsLastWeekChart({ reservations }) {
  const { t } = useTranslation('dashboard');
  const theme = getComputedStyle(document.documentElement);
  const primaryColor = theme.getPropertyValue('--color-primary').trim();

  const today = dayjs();
  const startOfRange = today.subtract(6, 'day');

  // filter listings of last week
  const lastWeekListings = reservations?.filter((reservation) =>
    dayjs(reservation?.created_at).isSameOrAfter(startOfRange, 'day'),
  );
  const reservationsPerDay = {};

  // fill days with data
  lastWeekListings?.forEach((listing) => {
    const day = dayjs(listing?.created_at).format('YYYY-MM-DD');
    reservationsPerDay[day] = (reservationsPerDay[day] || 0) + 1;
  });

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = startOfRange.add(i, 'day').format('YYYY-MM-DD');
    return {
      date,
      Count: reservationsPerDay[date] || 0,
    };
  });

  return (
    <ChartCard title={t('reservations_last_week')}>
      <div className='h-75 w-full'>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              domain={[0, 'dataMax ']}
              tick={{ fontSize: 14 }}
              label={{
                value: t('number_of_reservations'),
                angle: -90,
                dx: -20,
                fontSize: 14,
              }}
            />
            <XAxis
              dataKey='date'
              tickFormatter={(str) => dayjs(str).format('DD/MM')}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 13 }}
            />
            <Tooltip labelFormatter={(label) => dayjs(label).format('MMMM D, YYYY')} />
            <Line
              type='monotone'
              dataKey='Count'
              stroke={primaryColor + '80'}
              fill={primaryColor + '20'}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default memo(ReservationsLastWeekChart);
