import ChartCard from './ChartCard.jsx';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { reduce } from 'lodash';

function AveragePriceChart({ listings }) {
  const { t } = useTranslation('dashboard');
  const total = reduce(listings, (acc, listing) => acc + listing?.price, 0) / listings?.length;

  const formatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: '0',
  }).format(total);

  return (
    <ChartCard title={t('avg_price')}>
      <Flex vertical align='center' justify='center' className='text-primary/60 absolute inset-0'>
        <Flex align='center'>
          <span className='text-5xl'>$</span>
          <span className='text-8xl font-extrabold'>{formatted}</span>
        </Flex>
      </Flex>
    </ChartCard>
  );
}

export default AveragePriceChart;

// {total.toFixed(0)}
