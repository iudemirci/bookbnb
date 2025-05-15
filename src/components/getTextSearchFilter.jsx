import React from 'react';
import { Input, Button, Space } from 'antd';
import { Icon } from '@iconify/react';

export function getTextSearchFilter(dataIndex, t) {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={t(`dashboard:search_${dataIndex}`)}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type='primary' onClick={confirm} size='small' style={{ width: 90, borderRadius: 6 }}>
            {t('dashboard:search')}
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size='small'
            style={{ width: 90, borderRadius: 6 }}
          >
            {t('dashboard:reset')}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: <Icon icon='mdi:filter' width={20} />,
    onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  };
}
