import { Button, Typography } from 'antd';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'react-router-dom';

export default function Counter({ form, initialValue }) {
  const [searchParams] = useSearchParams();
  const guests = searchParams.get('guests');
  const [count, setCount] = useState(+guests || 1);

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      form.setFieldsValue({ guests: count - 1 });
    }
  };

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
    form.setFieldsValue({ guests: count + 1 });
  };

  return (
    <div className='flex items-center'>
      <Button
        shape='circle'
        size='small'
        className='!border-none !shadow-none'
        onClick={handleDecrease}
        disabled={count === 1}
      >
        <Icon icon='mdi:minus-circle-outline' width={23} />
      </Button>
      <Typography.Text className='!mr-0.5 w-8 text-center !font-bold'>{count}</Typography.Text>
      <Button
        shape='circle'
        size='small'
        className='!border-none !shadow-none'
        onClick={handleIncrease}
        disabled={count === 10}
      >
        <Icon icon='mdi:plus-circle-outline' width={23} />
      </Button>
    </div>
  );
}
