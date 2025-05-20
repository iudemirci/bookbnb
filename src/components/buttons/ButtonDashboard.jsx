import { Button } from 'antd';
import { Link } from 'react-router-dom';

function ButtonDashboard() {
  return (
    <Link to='/dashboard'>
      <Button type='text'>Dashboard</Button>
    </Link>
  );
}

export default ButtonDashboard;
