import { Col, Flex, Form, Row, Select, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import getCountries from '../../../utils/getCountries.js';
import Map from './FormMap.jsx';
import StepTitle from './StepTitle.jsx';
import { useState } from 'react';

function StepLocation({ form }) {
  const { t } = useTranslation('bookbnb');

  const [mapCenter, setMapCenter] = useState(null);
  const { getAll } = getCountries();
  const countries = getAll();

  const countryOptions = countries.map((country) => ({
    label: (
      <div>
        <Typography.Text className='!font-semibold'>{country.label}, </Typography.Text>
        <Typography.Text type='secondary'>{country.region}</Typography.Text>
      </div>
    ),
    value: country.label,
    latlng: country.latlng,
  }));

  const handleCountrySelect = (value, option) => {
    setMapCenter(option.latlng);
  };

  return (
    <Space direction='vertical' size={12} className='w-full'>
      <StepTitle title={t('location_title')} subtitle={t('location_subtitle')} />

      <Select
        showSearch
        placeholder={t('search_anywhere')}
        options={countryOptions}
        filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        size='large'
        onSelect={handleCountrySelect}
        className='w-full'
      />

      <Form.Item name='location' rules={[{ required: true, message: t('enter_location') }]}>
        <Map center={mapCenter} form={form} />
      </Form.Item>
    </Space>
  );
}

export default StepLocation;
