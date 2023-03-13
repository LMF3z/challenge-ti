import { useState, createContext, ReactNode } from 'react';
import { UsersI } from '../entities/users.entity';
import {
  getItemStorage,
  removeItemStorage,
  setItemStorage,
} from '../helpers/handleStorage.helper';

export type AuthContextType = {
  isAuth: UsersI | null;
  handleLogged: (toggleLogged: boolean, user?: UsersI) => void;
};

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<UsersI | null>(
    () => getItemStorage() as UsersI
  );

  const handleLogged = (toggleLogged: boolean, user?: UsersI) => {
    if (toggleLogged === true) {
      setItemStorage('user_v1', user);
      setIsAuth(user!);
    }

    if (toggleLogged === false) {
      removeItemStorage('user_v1');
      setIsAuth(null);
      return;
    }
  };

  const contextValues = { isAuth, handleLogged };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
