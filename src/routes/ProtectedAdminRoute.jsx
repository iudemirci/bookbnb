import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }) => {
  const { user, isPending } = useSelector((state) => state.auth);
  const role = user?.user_metadata?.role;

  if (isPending) {
    return <Spin size='large' fullscreen />;
  }

  if (!user || role !== 'admin') {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
