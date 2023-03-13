import { Outlet, Navigate } from 'react-router-dom';
import { routes } from '../../routes';
import useAuth from '../hooks/useAuthProvider';

const PublicRoutes = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to={routes.home} replace={true} />;
  }

  return <Outlet />;
};

export default PublicRoutes;
