import dayjs from 'dayjs';
import { memo, useMemo } from 'react';
import { Form, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import CustomTable from '../CustomTable.jsx';

import { getCheckboxFilter } from '../../../utils/dashboard/getCheckboxFilter.jsx';
import { getTextSearchFilter } from '../../../utils/dashboard/getTextSearchFilter.jsx';
import { categories } from '../../../data/categories.js';
import { useAdmin } from '../../../hooks/dashboard/useAdmin.js';
import { useDeleteRow } from '../../../hooks/dashboard/useDeleteRow.js';
import { useEditRow } from '../../../hooks/dashboard/useEditRow.jsx';

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
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const categoryFilterOptions = useCategoryFilterOptions();

  const { listings, isListingsPending } = useAdmin();

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

  // delete function
  const handleDelete = useDeleteRow('listings');

  // edit function
  const { handleEdit, isEditPending } = useEditRow('listings', form);

  return (
    <CustomTable
      form={form}
      dataSource={dataSource}
      columns={columns}
      isPending={isListingsPending}
      handleDelete={(ids) => handleDelete(ids)}
      handleEdit={(row) => handleEdit(row)}
      isEditPending={isEditPending}
      editAllowed={true}
    />
  );
}

export default memo(ListingsContent);
