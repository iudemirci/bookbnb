import dayjs from 'dayjs';
import { Form } from 'antd';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CustomTable from '../CustomTable.jsx';

import { useAdmin } from '../../../hooks/dashboard/useAdmin.js';
import { formatPrice } from '../../../utils/bookingUtils.js';
import { useDeleteRow } from '../../../hooks/dashboard/useDeleteRow.js';

function ReservationsContent() {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { reservations, isReservationsPending } = useAdmin();

  const dataSource = useMemo(
    () =>
      reservations?.map(({ id, price, date, created_at, users, currency, listing_id, guests }) => {
        const from = dayjs(date[0]);
        const to = dayjs(date[1]);
        const duration = to.diff(from, 'day');

        return {
          key: id,
          id,
          listing_id,
          from,
          to,
          duration,
          guests,
          created_at,
          price: price.toFixed(1),
          currency,
          username: users?.username,
        };
      }),
    [reservations],
  );

  const columns = useMemo(
    () => [
      {
        title: t('dashboard:listing_id'),
        dataIndex: 'listing_id',
        key: 'listing_id',
        width: 140,
        sorter: (a, b) => a.listings_id - b.listings_id,
      },
      {
        title: t('dashboard:username'),
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),
        ellipsis: true,
      },
      {
        title: t('dashboard:from'),
        dataIndex: 'from',
        key: 'from',
        width: 180,
        sorter: (a, b) => dayjs(a.from).unix() - dayjs(b.from).unix(),
        render: (key) => dayjs(key).format('DD MMM YYYY'),
      },
      {
        title: t('dashboard:to'),
        dataIndex: 'to',
        key: 'to',
        width: 180,
        sorter: (a, b) => dayjs(a.to).unix() - dayjs(b.to).unix(),
        render: (key) => dayjs(key).format('DD MMM YYYY'),
      },
      {
        title: t('dashboard:duration'),
        dataIndex: 'duration',
        key: 'duration',
        width: 130,
        render: (key) =>
          key > 1 ? t('dashboard:duration_days', { count: key }) : t('dashboard:duration_day', { count: 1 }),
        sorter: (a, b) => a.duration - b.duration,
      },
      {
        title: t('dashboard:guests'),
        dataIndex: 'guests',
        key: 'guests',
        width: 120,
        sorter: (a, b) => a.guests - b.guests,
      },
      {
        title: t('dashboard:price'),
        dataIndex: 'price',
        key: 'price',
        width: 150,
        render: (_, record) => {
          return formatPrice(record.price, record.currency);
        },
      },
      {
        title: t('dashboard:date'),
        dataIndex: 'created_at',
        key: 'created_at',
        width: 130,
        sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
        render: (key) => dayjs(key).format('DD/MM/YYYY'),
      },
    ],
    [t],
  );

  // delete function
  const handleDelete = useDeleteRow('reservations');

  return (
    <CustomTable
      form={form}
      columns={columns}
      dataSource={dataSource}
      isPending={isReservationsPending}
      handleDelete={(ids) => handleDelete(ids)}
    />
  );
}

export default memo(ReservationsContent);
