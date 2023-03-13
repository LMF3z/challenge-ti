import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuthProvider';
import { routes } from '../../routes';

const PrivateRoutes = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(routes.login, { replace: true });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (!isAuth) {
    <Navigate to={routes.login} replace={true} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
