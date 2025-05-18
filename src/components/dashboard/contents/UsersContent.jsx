import { Form } from 'antd';
import CustomTable from '../CustomTable.jsx';
import { memo, useMemo } from 'react';
import { useAdmin } from '../../../hooks/dashboard/useAdmin.js';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { getCheckboxFilter } from '../../../utils/dashboard/getCheckboxFilter.jsx';
import { useDeleteRow } from '../../../hooks/dashboard/useDeleteRow.js';
import { useEditRow } from '../../../hooks/dashboard/useEditRow.jsx';

const checkboxFilterOptions = [
  {
    text: 'User',
    value: 'user',
  },
  {
    text: 'Admin',
    value: 'admin',
  },
];

function UsersContent() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { users, isUsersPending } = useAdmin();

  const dataSource = useMemo(
    () =>
      users?.map(({ username, role, created_at, id, reservations, listings, reports, user_id }) => ({
        key: id,
        id,
        user_id,
        username,
        role,
        reservations,
        listings,
        reports,
        created_at,
      })),
    [users],
  );

  const columns = useMemo(
    () => [
      {
        title: t('dashboard:user'),
        dataIndex: 'username',
        key: 'username',
        editable: true,
        sorter: (a, b) => a.username.localeCompare(b.username),
      },
      {
        title: t('dashboard:listings'),
        dataIndex: 'listings',
        key: 'listings',
        width: 150,
        sorter: (a, b) => b.listings - a.listings,
      },
      {
        title: t('dashboard:reservations'),
        dataIndex: 'reservations',
        key: 'reservations',
        width: 150,
        sorter: (a, b) => b.reservations - a.reservations,
      },
      {
        title: t('dashboard:reports'),
        dataIndex: 'reports',
        key: 'reports',
        width: 150,
        sorter: (a, b) => b.reports - a.reports,
      },
      {
        title: t('dashboard:role'),
        key: 'role',
        dataIndex: 'role',
        editable: true,
        inputType: 'select',
        width: 150,
        sorter: (a, b) => a.role.localeCompare(b.role),
        ...getCheckboxFilter(checkboxFilterOptions, 'role'),
      },
      {
        title: t('dashboard:date'),
        dataIndex: 'created_at',
        key: 'created_at',
        width: 150,
        sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
        render: (key) => dayjs(key).format('DD/MM/YYYY'),
      },
    ],
    [t],
  );

  // delete function
  const handleDelete = useDeleteRow('users');

  // edit function
  const { handleEdit, isEditPending } = useEditRow('users', form);

  return (
    <CustomTable
      form={form}
      columns={columns}
      dataSource={dataSource}
      isPending={isUsersPending}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      isEditPending={isEditPending}
      editAllowed={true}
    />
  );
}

export default memo(UsersContent);
