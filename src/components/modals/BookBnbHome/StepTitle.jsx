import { Flex, Typography } from 'antd';

function StepTitle({ title, subtitle }) {
  return (
    <Flex vertical={true} justify='center' gap={12} className='!pt-4'>
      <Typography.Title level={2} className='!font-extrabold'>
        {title}
      </Typography.Title>
      <Typography.Title level={4} type='secondary'>
        {subtitle}
      </Typography.Title>
    </Flex>
  );
}

export default StepTitle;
