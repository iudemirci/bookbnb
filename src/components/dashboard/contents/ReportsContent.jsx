import { useMemo } from 'react';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import CustomTable from '../CustomTable';

import { useAdmin } from '../../../hooks/dashboard/useAdmin';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { useDeleteRow } from '../../../hooks/dashboard/useDeleteRow';

const renderBoolean = (value) =>
  value ? (
    <Icon icon='mdi:check' width={20} className='text-green-500' />
  ) : (
    <Icon icon='mdi:close' width={20} className='text-red-500' />
  );

function ReportsContent() {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { reports, isReportsPending } = useAdmin();

  const dataSource = useMemo(
    () =>
      reports?.map(({ inappropriate, id, location, price, users, created_at, listing_id, text }) => ({
        key: id,
        id,
        listing_id,
        inappropriate,
        location,
        price,
        created_at,
        text,
        username: users?.username,
      })) || [],
    [reports],
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
      },
      {
        title: t('details:report_inappropriate_title'),
        dataIndex: 'inappropriate',
        key: 'inappropriate',
        width: 170,
        render: renderBoolean,
      },
      {
        title: t('details:report_location_title'),
        dataIndex: 'location',
        key: 'location',
        width: 170,
        render: renderBoolean,
      },
      {
        title: t('details:report_price_title'),
        dataIndex: 'price',
        key: 'price',
        width: 170,
        render: renderBoolean,
      },
      {
        title: t('dashboard:date'),
        dataIndex: 'created_at',
        key: 'created_at',
        width: 150,
        sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
        render: (key) => dayjs(key).format('DD/MM/YYYY HH:mm'),
      },
    ],
    [t],
  );

  // delete function
  const handleDelete = useDeleteRow('reports');

  return (
    <CustomTable
      form={form}
      dataSource={dataSource}
      columns={columns}
      isPending={isReportsPending}
      handleDelete={handleDelete}
      expandable={{
        expandedRowRender: (record) =>
          record?.text ? (
            <Typography.Paragraph style={{ margin: 0 }}>{record.text}</Typography.Paragraph>
          ) : (
            <span>-</span>
          ),
        rowExpandable: (record) => !!record.text,
      }}
    />
  );
}

export default ReportsContent;
