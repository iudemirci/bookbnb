import dayjs from 'dayjs';
import { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, message, Tag } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import CustomTable from './CustomTable.jsx';

import { getCheckboxFilter } from '../../utils/dashboard/getCheckboxFilter.jsx';
import { useAdminActions } from '../../hooks/dashboard/useAdminActions.jsx';
import { getTextSearchFilter } from '../../utils/dashboard/getTextSearchFilter.jsx';
import { categories } from '../../data/categories.js';
import { setEditingKey, setSelectedKeys } from '../../store/dashboardSlice.js';
import { useAdmin } from '../../hooks/dashboard/useAdmin.js';

function useCategoryFilterOptions() {
  const { t } = useTranslation();

  return useMemo(() => {
    return categories
      .filter((category) => category.key !== 'trending')
      .map((category) => ({
        text: t(`tabs:${category.key}`),
        value: category.key,
      }));
  }, [t]);
}

function ListingsContent() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const categoryFilterOptions = useCategoryFilterOptions();

  const { listings, isListingsPending } = useAdmin();
  const { deleteRow, editRow, isEditPending } = useAdminActions('listings');

  const dataSource = useMemo(
    () =>
      listings?.map(({ id, category, title, rooms, bathrooms, guests, location, price, users, created_at }) => ({
        key: id,
        id,
        title,
        category,
        rooms,
        bathrooms,
        guests,
        location,
        created_at,
        price: price.toFixed(1),
        username: users?.username,
      })),
    [listings],
  );

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach(({ key, color }) => {
      map.set(key, { label: t(`tabs:${key}`), color });
    });
    return map;
  }, [t]);

  const columns = useMemo(
    () => [
      {
        title: t('dashboard:title'),
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
        width: 350,
        editable: true,
        sorter: (a, b) => a.title.localeCompare(b.title),
        ...getTextSearchFilter('title', t),
      },
      {
        title: t('dashboard:location'),
        dataIndex: 'location',
        key: 'location',
        ellipsis: true,
        width: 200,
        editable: true,
        sorter: (a, b) => a.location.localeCompare(b.location),
        ...getTextSearchFilter('location', t),
      },
      {
        title: t('dashboard:category'),
        dataIndex: 'category',
        key: 'category',
        width: 150,
        sorter: (a, b) => a.category.localeCompare(b.category),
        render: (key) => {
          const category = categoryMap.get(key);
          return <Tag color={category?.color}>{category?.label}</Tag>;
        },
        ...getCheckboxFilter(categoryFilterOptions, 'category'),
      },
      {
        title: t('dashboard:rooms'),
        dataIndex: 'rooms',
        key: 'rooms',
        width: 110,
        editable: true,
        sorter: (a, b) => a.rooms - b.rooms,
      },
      {
        title: t('dashboard:bathrooms'),
        dataIndex: 'bathrooms',
        key: 'bathrooms',
        width: 120,
        editable: true,
        sorter: (a, b) => a.bathrooms - b.bathrooms,
      },
      {
        title: t('dashboard:guests'),
        dataIndex: 'guests',
        key: 'guests',
        width: 120,
        editable: true,
        sorter: (a, b) => a.guests - b.guests,
      },
      {
        title: t('dashboard:price'),
        dataIndex: 'price',
        key: 'price',
        width: 130,
        ellipsis: true,
        editable: true,
        sorter: (a, b) => a.price - b.price,
        render: (key) => `$${key}`,
      },
      {
        title: t('dashboard:username'),
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),
        width: 140,
        ellipsis: true,
      },
      {
        title: t('dashboard:date'),
        dataIndex: 'created_at',
        key: 'created_at',
        width: 110,
        sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
        render: (key) => dayjs(key).format('DD/MM/YYYY'),
      },
    ],
    [t, categoryFilterOptions, categoryMap],
  );

  // edit function
  const handleEdit = useCallback(
    async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          const { key: _key, username: _username, ...cleanItem } = { ...item, ...row };

          editRow(cleanItem, {
            onSuccess: () => {
              message.success(t('dashboard:edit_success'));
              queryClient.invalidateQueries(['admin', 'listings']);
              dispatch(setEditingKey(''));
            },
            onError: () => {
              message.error(t('dashboard:edit_error'));
            },
          });
        }
      } catch (error) {
        if (error) {
          message.error(t('dashboard:form_fill_required'));
        } else {
          message.error(t('dashboard:edit_error'));
        }
      }
    },
    [form, dataSource, queryClient, editRow, t, dispatch],
  );

  // delete function
  const handleDelete = useCallback(
    (id) => {
      deleteRow([id], {
        onSuccess: () => {
          message.success(t('dashboard:delete_success'));
          queryClient.invalidateQueries(['admin', 'listings']);
          dispatch(setSelectedKeys([]));
        },
        onError: () => {
          message.error(t('dashboard:delete_error'));
        },
      });
    },
    [deleteRow, queryClient, t, dispatch],
  );

  return (
    <div className='flex size-full flex-col pr-4'>
      <CustomTable
        form={form}
        dataSource={dataSource}
        columns={columns}
        isPending={isListingsPending}
        handleDelete={(ids) => handleDelete(ids)}
        handleEdit={(row) => handleEdit(row)}
        isEditPending={isEditPending}
      />
    </div>
  );
}

export default memo(ListingsContent);
