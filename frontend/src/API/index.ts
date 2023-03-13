import { getItemStorage } from '../helpers/handleStorage.helper';
import { UsersI } from '../entities/users.entity';

export const headers = (contentType: string = 'application/json') => {
  const { role, token } = getItemStorage() as UsersI;

  if (token) {
    return {
      'Content-Type': contentType,
      authorization: 'Bearer ' + token,
      role,
    };
  }

  return null;
};
