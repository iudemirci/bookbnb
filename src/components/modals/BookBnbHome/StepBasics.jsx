import { Col, Divider, Flex, Form, InputNumber, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

function StepBasics({ form }) {
  const { t } = useTranslation();

  const tabs = useMemo(() => {
    return [
      {
        title: t('bookbnb_guests'),
        subtitle: t('bookbnb_guests_subtitle'),
        name: 'guests',
      },
      {
        title: t('bookbnb_rooms'),
        subtitle: t('bookbnb_rooms_subtitle'),
        name: 'rooms',
      },
      {
        title: t('bookbnb_bathrooms'),
        subtitle: t('bookbnb_bathrooms_subtitle'),
        name: 'bathrooms',
      },
    ];
  }, []);

  return (
    <Space direction='vertical' size={2} className='w-full'>
      <Flex vertical={true} justify='center' gap={12} className='!mb-4'>
        <Typography.Title level={2} className='!font-extrabold'>
          {t('bookbnb_category_title')}
        </Typography.Title>
        <Typography.Title level={4} type='secondary'>
          {t('bookbnb_category_subtitle')}
        </Typography.Title>
      </Flex>

      {tabs.map(({ title, subtitle, name }, idx) => (
        <div>
          <Row key={title} gutter={[6, 12]} role='list' justify='space-between' align='middle'>
            <Col>
              <Flex vertical={true} justify='center'>
                <Typography.Text>{title}</Typography.Text>
                <Typography.Text type='secondary'>{subtitle}</Typography.Text>
              </Flex>
            </Col>
            <Col>
              <Form.Item name={name}>
                <InputNumber min={1} step={1} />
              </Form.Item>
            </Col>
          </Row>

          {idx < tabs.length - 1 && <Divider />}
        </div>
      ))}
    </Space>
  );
}

export default StepBasics;
