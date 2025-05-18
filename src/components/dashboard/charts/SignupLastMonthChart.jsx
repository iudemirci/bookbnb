import dayjs from 'dayjs';
import ChartCard from './ChartCard.jsx';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from '../../../data/chartColors.js';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

function SignupLastMonthChart({ users }) {
  const { t } = useTranslation('dashboard');
  const currentMonthUsers = users.filter((user) => {
    const createdAt = dayjs(user.created_at);
    const now = dayjs();
    return createdAt.isSame(now, 'month') && createdAt.isSame(now, 'year');
  });

  const userCountByDay = {};

  currentMonthUsers.forEach((user) => {
    const day = dayjs(user.created_at).format('YYYY-MM-DD');
    userCountByDay[day] = (userCountByDay[day] || 0) + 1;
  });

  const chartData = Object.entries(userCountByDay).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <ChartCard title={t('users_this_month')}>
      <ResponsiveContainer width='100%' height={250}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='date'
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => dayjs(date).format('DD/MM')}
            interval={Math.ceil(chartData.length / 8) - 1}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            label={{
              value: t('number_of_listings'),
              angle: -90,
              dx: -20,
              fontSize: 14,
            }}
          />
          <Tooltip labelFormatter={(label) => dayjs(label).format('MMMM D, YYYY')} />
          <Bar dataKey='count' fill={COLORS[0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default memo(SignupLastMonthChart);
