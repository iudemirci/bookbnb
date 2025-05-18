import ChartCard from './ChartCard.jsx';
import { countBy } from 'lodash/collection.js';
import { map, orderBy, take } from 'lodash';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../../data/chartColors.js';
import { memo } from 'react';

function getTopCountries(listings) {
  const countries = listings?.map((listing) => listing?.location?.split(', ')?.[1])?.filter(Boolean);

  const countryCounts = countBy(countries);

  const countryData = map(countryCounts, (count, country) => ({
    country,
    count,
  }));

  return take(orderBy(countryData, 'count', 'desc'), 6);
}

function CountriesChart({ listings }) {
  const { t } = useTranslation();
  const chartData = getTopCountries(listings);

  return (
    <ChartCard title={t('dashboard:most_listed_countries')}>
      <ResponsiveContainer width='100%' height={250}>
        <BarChart data={chartData} layout='vertical'>
          <XAxis type='number' allowDecimals={false} />
          <YAxis dataKey='country' type='category' tick={{ fontSize: 14 }} />
          <Tooltip formatter={(value) => [`${value}`, t('dashboard:listings')]} />
          <Bar dataKey='count' radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default memo(CountriesChart);
