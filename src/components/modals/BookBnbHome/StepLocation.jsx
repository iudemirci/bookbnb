import { Col, Flex, Form, Row, Select, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import useCountries from '../../../hooks/useCountries.js';
import Map from './Map.jsx';

function StepLocation({ form }) {
  const { t } = useTranslation();
  const selectedLocation = Form.useWatch('location', form);

  const { getAll } = useCountries();
  const countries = getAll();

  const countryOptions = countries.map((country) => ({
    label: (
      <div>
        <Typography.Text className='!font-semibold'>{country.label}, </Typography.Text>
        <Typography.Text type='secondary'>{country.region}</Typography.Text>
      </div>
    ),
    value: country.label,
  }));

  return (
    <Space direction='vertical' size={12} className='w-full'>
      <Flex vertical={true} justify='center' gap={12} className='!mb-4'>
        <Typography.Title level={2} className='!font-extrabold'>
          {t('bookbnb_basics_title')}
        </Typography.Title>
        <Typography.Title level={4} type='secondary'>
          {t('bookbnb_basics_subtitle')}
        </Typography.Title>
      </Flex>

      <Select
        showSearch
        placeholder={t('search_anywhere')}
        value={form.getFieldValue('location') || null}
        options={countryOptions}
        size='large'
        onSelect={(value) => form.setFieldValue('location', value)}
      />

      <Map center={selectedLocation && countries.find((country) => country.label === selectedLocation).latlng} />
    </Space>
  );
}

export default StepLocation;
