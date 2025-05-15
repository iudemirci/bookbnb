import { useAdmin } from '../../../hooks/useAdmin.js';
import { Table } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../../../data/categories.js';
import { getTextSearchFilter } from '../../getTextSearchFilter.jsx';
import { getCheckboxFilter } from '../../getCheckboxFilter.jsx';

function useCategoryFilterOptions() {
  const { t } = useTranslation();

  return categories
    .filter((category) => category.key !== 'trending')
    .map((category) => ({
      text: t(`tabs:${category.key}`),
      value: category.key,
    }));
}

function ListingsContent() {
  const { listings, isListingsPending } = useAdmin();
  const { t } = useTranslation();
  const categoryFilterOptions = useCategoryFilterOptions();

  const dataSource = useMemo(
    () =>
      listings?.map(({ category, title, rooms, bathrooms, guests, location, price }, idx) => ({
        key: idx,
        title,
        category,
        rooms,
        bathrooms,
        guests,
        location,
        price: price.toFixed(1),
      })),
    [listings],
  );

  const columns = useMemo(
    () => [
      {
        title: t('dashboard:title'),
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        ...getTextSearchFilter('title', t),
      },
      {
        title: t('dashboard:location'),
        dataIndex: 'location',
        key: 'location',
        sorter: (a, b) => a.location.localeCompare(b.location),
        ...getTextSearchFilter('location', t),
      },
      {
        title: t('dashboard:category'),
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.localeCompare(b.category),
        render: (key) => t(`tabs:${key}`),
        ...getCheckboxFilter(categoryFilterOptions, 'category'),
      },
      {
        title: t('dashboard:rooms'),
        dataIndex: 'rooms',
        key: 'rooms',
        width: 130,
        sorter: (a, b) => a.rooms - b.rooms,
      },
      {
        title: t('dashboard:bathrooms'),
        dataIndex: 'bathrooms',
        key: 'bathrooms',
        width: 130,
        sorter: (a, b) => a.bathrooms - b.bathrooms,
      },
      {
        title: t('dashboard:guests'),
        dataIndex: 'guests',
        key: 'guests',
        width: 130,
        sorter: (a, b) => a.guests - b.guests,
      },
      {
        title: t('dashboard:price'),
        dataIndex: 'price',
        key: 'price',
        width: 130,
        sorter: (a, b) => a.price - b.price,
        render: (key) => `$${key}`,
      },
    ],
    [t, categoryFilterOptions],
  );

  return (
    <div className='flex size-full flex-col pr-4'>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={isListingsPending}
        className='size-full'
        size='middle'
        pagination={{
          pageSize: 13,
        }}
        bordered
        rowClassName={(record, idx) => (idx % 2 === 0 ? 'bg-bg-primary' : 'bg-zinc-100/40')}
        // scroll={{ y: '100%' }}
      />
    </div>
  );
}

export default ListingsContent;
