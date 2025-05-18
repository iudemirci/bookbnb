import ChartCard from './ChartCard.jsx';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

function ActiveReservationsChart({ reservations }) {
  const { t } = useTranslation('dashboard');

  return (
    <ChartCard title={t('active')}>
      <Flex vertical align='center' justify='center' className='text-primary/60 absolute inset-0'>
        <span className='text-9xl font-extrabold'>{reservations?.length}</span>
        <span className='text-xl'>{t('reservation')}</span>
      </Flex>
    </ChartCard>
  );
}

export default ActiveReservationsChart;
