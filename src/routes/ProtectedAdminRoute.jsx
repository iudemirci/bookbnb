import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useIsAdmin from '../hooks/auth/useIsAdmin';

const ProtectedRoute = ({ children }) => {
  const isPending = useSelector((state) => state.auth.isPending);
  const { isAdmin, isPending: isRolePending } = useIsAdmin();

  if (isPending || isRolePending) {
    return <Spin size='large' fullscreen />;
  }

  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
