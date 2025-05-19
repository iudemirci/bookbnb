import { Form, Tag } from 'antd';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAdmin } from '../../../hooks/dashboard/useAdmin.js';
import { useDeleteRow } from '../../../hooks/dashboard/useDeleteRow.js';
import { useEditRow } from '../../../hooks/dashboard/useEditRow.jsx';
import { getCheckboxFilter } from '../../../utils/dashboard/getCheckboxFilter.jsx';
import CustomTable from '../CustomTable.jsx';

const checkboxFilterOptions = [
  {
    text: 'User',
    value: 'user',
  },
  {
    text: 'Admin',
    value: ['superadmin', 'admin'],
  },
];

const renderRoleTag = (role) => {
  const isUser = role === 'user';

  return <Tag color={isUser ? 'blue' : 'red'}>{isUser ? 'User' : 'Admin'}</Tag>;
};

function UsersContent() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { users, isUsersPending } = useAdmin();
  const user_id = useSelector((state) => state.auth.user?.id);

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
        render: renderRoleTag,
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
      currentUserId={user_id}
      isUsersTable={true}
    />
  );
}

export default memo(UsersContent);
