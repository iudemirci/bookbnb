import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }) => {
  const { user, isPending } = useSelector((state) => state.auth);

  if (isPending) {
    return <Spin size='large' fullscreen />;
  }

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
