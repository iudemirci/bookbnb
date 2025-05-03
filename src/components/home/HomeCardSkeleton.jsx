import { Col, Flex, Row, Skeleton } from 'antd';

function HomeCardSkeleton() {
  return (
    <Flex vertical={true}>
      <div className='relative aspect-square w-full rounded-3xl bg-gray-100 shadow-sm'>
        <div className='absolute top-4 left-4 z-10'>
          <Skeleton.Button size='small' style={{ width: 120, height: 28, borderRadius: 999 }} />
        </div>
        <div className='absolute top-4 right-4 z-10'>
          <Skeleton.Avatar size='small' style={{ width: 28, height: 28, borderRadius: 999 }} />
        </div>
      </div>

      <Flex vertical={true} className='!pt-3'>
        {[...Array(4)].map((_, idx) => (
          <Row key={idx} className='mt-1.5'>
            <Col>
              <Skeleton.Input style={{ width: 20, height: 16 }} />
            </Col>
          </Row>
        ))}
      </Flex>
    </Flex>
  );
}

export default HomeCardSkeleton;
