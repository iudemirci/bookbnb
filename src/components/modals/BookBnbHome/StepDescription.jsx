import { Divider, Flex, Form, Input, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import StepTitle from './StepTitle.jsx';

function StepDescription() {
  const { t } = useTranslation('bookbnb');

  const inputs = useMemo(
    () => [
      {
        name: 'title',
        label: t('title'),
        rules: [{ required: true, message: t('enter_title') }],
      },
      {
        name: 'description',
        label: t('description'),
        rules: [{ required: true, message: t('enter_description') }],
      },
    ],
    [t],
  );

  return (
    <div>
      <StepTitle title={t('description_title')} subtitle={t('description_subtitle')} />

      <Flex vertical={true} gap={12} className='!my-4'>
        {inputs.map(({ name, label, rules }, idx) => (
          <div key={name} className='w-full'>
            <Form.Item name={name} style={{ marginBottom: 0 }} rules={rules}>
              <Input size='large' placeholder={label} />
            </Form.Item>

            {idx < inputs.length - 1 && <Divider className='!mt-6' />}
          </div>
        ))}
      </Flex>
    </div>
  );
}

export default StepDescription;
