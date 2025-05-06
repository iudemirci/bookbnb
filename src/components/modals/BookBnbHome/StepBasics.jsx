import { Col, Divider, Flex, Form, InputNumber, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import StepTitle from './StepTitle.jsx';

function StepBasics({ form }) {
  const { t } = useTranslation('bookbnb');

  const tabs = useMemo(() => {
    return [
      {
        title: t('guests'),
        subtitle: t('guests_subtitle'),
        name: 'guests',
      },
      {
        title: t('rooms'),
        subtitle: t('rooms_subtitle'),
        name: 'rooms',
      },
      {
        title: t('bathrooms'),
        subtitle: t('bathrooms_subtitle'),
        name: 'bathrooms',
      },
    ];
  }, []);

  return (
    <Space direction='vertical' size={2} className='w-full'>
      <StepTitle title={t('basics_title')} subtitle={t('basics_subtitle')} />

      <div className='pt-4'>
        {tabs.map(({ title, subtitle, name }, idx) => (
          <div key={title}>
            <Row gutter={[6, 12]} role='list' justify='space-between' align='middle'>
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
      </div>
    </Space>
  );
}

export default memo(StepBasics);
