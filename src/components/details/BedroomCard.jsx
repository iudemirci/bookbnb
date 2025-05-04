import { Flex, Typography } from 'antd';
const { Title, Text } = Typography;
import { Icon } from '@iconify/react';

function BedroomCard({ title, bedCount, bedType }) {
  return (
    <Flex className='border-border-grey flex-1 rounded-lg border !p-5' vertical={true} gap={16}>
      <Flex gap={6} align='center'>
        {Array.from({ length: bedCount }).map((_, index) => (
          <Icon key={index} icon='material-symbols:bed-outline' width={25} />
        ))}
      </Flex>
      <Flex vertical={true}>
        <Title level={4}>{title}</Title>
        <Text type='secondary'>
          {bedCount} {bedType}
          {bedCount > 1 ? 's' : ''}
        </Text>
      </Flex>
    </Flex>
  );
}

export default BedroomCard;
