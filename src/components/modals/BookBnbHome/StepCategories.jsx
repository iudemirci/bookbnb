import { Col, Flex, Form, Row, Space, Typography } from 'antd';
import CategoryInput from '../../CategoryInput.jsx';
import { useTranslation } from 'react-i18next';
import { categories } from '../../../data/categories.js';
import StepTitle from './StepTitle.jsx';
import { memo } from 'react';

const newCategories = categories.slice(1, categories.length);

function StepCategories({ form, edit }) {
  const { t } = useTranslation('bookbnb');
  const selectedCategory = Form.useWatch('category', form);

  return (
    <Space direction='vertical' size={12}>
      <StepTitle title={t('category_title')} subtitle={t('category_subtitle')} />

      <Form.Item name='category' rules={[{ required: true, message: t('enter_category') }]} className='!mb-0'>
        <Row gutter={[6, 6]} role='list'>
          {newCategories.map(({ key, icon }) => (
            <Col key={key} role='listitem' xs={24} sm={12}>
              <div onClick={() => form.setFieldValue('category', key)}>
                <CategoryInput category={key} icon={icon} isSelected={selectedCategory === key} />
              </div>
            </Col>
          ))}
        </Row>
      </Form.Item>
    </Space>
  );
}

export default memo(StepCategories);
