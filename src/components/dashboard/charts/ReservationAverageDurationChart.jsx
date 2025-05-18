import ChartCard from './ChartCard.jsx';
import { meanBy } from 'lodash';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

function ReservationAverageDurationChart({ reservations }) {
  const { t } = useTranslation('dashboard');
  const averageDuration = useMemo(
    () =>
      Math.round(
        meanBy(reservations, (reservation) => {
          const from = dayjs(reservation?.date?.[0]);
          const to = dayjs(reservation?.date?.[1]);
          return to.diff(from, 'day');
        }),
      ),
    [reservations],
  );

  return (
    <ChartCard title={t('avg_stay_duration')}>
      <Flex vertical align='center' justify='center' className='text-primary/60 absolute inset-0'>
        <span className='text-9xl font-extrabold'>{averageDuration}</span>
        <span className='text-xl'>{t('day')}</span>
      </Flex>
    </ChartCard>
  );
}

export default ReservationAverageDurationChart;
