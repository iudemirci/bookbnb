import { Button, Radio, Space } from 'antd';
import { Icon } from '@iconify/react';

export function getCheckboxFilter(filters, dataIndex) {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className='w-91 p-4'>
        <Radio.Group
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys([e.target.value]);
            confirm();
          }}
        >
          <div className='grid grid-cols-2 items-center gap-y-1' style={{ maxHeight: 330, overflowY: 'auto' }}>
            {filters.map((filter) => (
              <Radio key={filter.value} value={filter.value} className='truncate'>
                {filter.text}
              </Radio>
            ))}
          </div>
        </Radio.Group>
        <Space style={{ marginTop: 8 }}>
          <Button type='primary' onClick={confirm} size='small' style={{ width: 90, borderRadius: 6 }}>
            Apply
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size='small'
            style={{ width: 90, borderRadius: 6 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: <Icon icon='mdi:filter' width={20} />,
    onFilter: (value, record) => record[dataIndex] === value,
  };
}
