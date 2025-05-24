import { Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function ButtonDashboard() {
  const { pathname } = useLocation();
  const isDashboard = pathname === '/dashboard';

  return !isDashboard ? (
    <Link to='/dashboard'>
      <Button type='text'>Dashboard</Button>
    </Link>
  ) : null;
}

export default ButtonDashboard;
