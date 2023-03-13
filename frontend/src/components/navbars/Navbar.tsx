import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import useAuth from '../hooks/useAuthProvider';
import { routes } from '../../routes';

const Navbar = () => {
  const { isAuth, handleLogged } = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    handleLogged(false);
    navigate(routes.login, { replace: true });
  };

  return (
    <header className='w-full p-3 flex border-b border-customBlue'>
      <div className='w-full'>
        <span className='capitalize'>Data app</span>
      </div>
      {isAuth && (
        <div className='flex flex-1 items-center gap-1 cursor-pointer hover:text-green-600'>
          <span onClick={logout}>Salir</span>
          <BiLogOut />
        </div>
      )}
    </header>
  );
};

export default Navbar;
