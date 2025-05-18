import ChartCard from './ChartCard.jsx';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

function ActiveReservationsChart({ reservations }) {
  const { t } = useTranslation('dashboard');

  const activeReservations = reservations?.filter((reservation) =>
    dayjs(reservation?.date?.[1]).isAfter(dayjs()),
  )?.length;

  return (
    <ChartCard title={t('active')}>
      <Flex vertical align='center' justify='center' className='text-primary/60 absolute inset-0'>
        <span className='text-9xl font-extrabold'>{activeReservations}</span>
        <span className='text-xl'>{t('reservation')}</span>
      </Flex>
    </ChartCard>
  );
}

export default ActiveReservationsChart;
