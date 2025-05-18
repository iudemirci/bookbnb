import { Typography } from 'antd';

function ChartCard({ title, children }) {
  return (
    <div className='bg-primary/3 shadow-dashboard-card relative size-full rounded-xl p-4'>
      <Typography.Title level={3} className='pb-4 pl-4'>
        {title}
      </Typography.Title>
      {children}
    </div>
  );
}

export default ChartCard;
