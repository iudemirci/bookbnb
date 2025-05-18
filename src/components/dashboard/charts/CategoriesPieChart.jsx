import ChartCard from './ChartCard.jsx';
import { map, orderBy, take } from 'lodash';
import { countBy } from 'lodash/collection.js';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { COLORS } from '../../../data/chartColors.js';

function CategoriesPieChart({ listings }) {
  const { t } = useTranslation();
  const categoryCounts = countBy(listings, 'category');
  const categoryData = map(categoryCounts, (count, category) => ({
    category,
    count,
  }));
  const topCategoriesData = take(orderBy(categoryData, 'count', 'desc'), 6);

  const renderLegend = useCallback(
    (props) => {
      const { payload } = props;

      return (
        <ul className='mr-4 flex flex-col gap-0.5'>
          {payload.map((entry, idx) => (
            <li
              key={`key-${idx}`}
              style={{
                color: entry.color,
              }}
              className='flex items-center justify-between gap-12'
            >
              <div>
                <span
                  className='mr-1 inline-block rounded-full p-1.5'
                  style={{
                    backgroundColor: entry.color,
                  }}
                />
                {t(`tabs:${entry.value}`)}
              </div>
              <span>{entry.payload.count}</span>
            </li>
          ))}
        </ul>
      );
    },
    [t],
  );

  return (
    <ChartCard title={t('dashboard:categories')}>
      <ResponsiveContainer width='100%' height={250}>
        <PieChart>
          <Pie
            data={topCategoriesData}
            dataKey='count'
            nameKey='category'
            cx='50%'
            cy='50%'
            outerRadius={90}
            innerRadius={70}
            paddingAngle={4}
          >
            {topCategoriesData?.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(count, name) => [count, t(`tabs:${name}`)]} />
          <Legend align='right' verticalAlign='middle' layout='vertical' content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default memo(CategoriesPieChart);
