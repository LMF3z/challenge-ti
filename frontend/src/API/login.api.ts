import axios from 'axios';
import { UsersI } from '../entities/users.entity';

export const loginApi = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('/auth/login', loginData);

    return response.data;
  } catch (error: unknown) {
    const newError = error as {
      response: { data: { error: { message: string } } };
    };

    if (newError?.response?.data?.error?.message) {
      return { error: newError?.response?.data?.error?.message };
    }

    return { error: 'Error al iniciar sesión' };
  }
};
