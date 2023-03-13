import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../../contexts/AuthProvider';

const useAuth = () => useContext(AuthContext) as AuthContextType;

export default useAuth;
