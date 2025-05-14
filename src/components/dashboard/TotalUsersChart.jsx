import ChartCard from './ChartCard.jsx';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

function TotalUsersChart({ users }) {
  const { t } = useTranslation('dashboard');
  const total = users?.length;

  return (
    <ChartCard title={t('total')}>
      <Flex vertical align='center' justify='center' className='text-primary/60 absolute inset-0'>
        <span className='text-9xl font-extrabold'>{total}</span>
        <span className='text-xl'>{t('user')}</span>
      </Flex>
    </ChartCard>
  );
}

export default TotalUsersChart;
