import { getUserByEmail } from '../../repository/users/users.repository';
import {
  comparePassword,
  decryptData,
} from '../../helpers/handlerPassword.helper';
import { StatusCodes } from 'http-status-codes';
import { UsersI } from '../../entities/users.entity';
import { signTokenUsers } from '../../helpers/handleToken.helper';

interface UserLoginI extends Partial<UsersI> {
  token: string;
}

/**
 * @param param0 login data
 * @returns user data with access token
 */
export const loginServices = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserLoginI> => {
  try {
    const userFound = await getUserByEmail(email);

    const isPasswordValid = await comparePassword(
      password,
      decryptData(userFound.password)
    );

    if (!isPasswordValid) {
      throw {
        message: 'Error el correo o contraseña',
        status: StatusCodes.BAD_REQUEST,
      };
    }

    delete (userFound as any).password;

    const token = signTokenUsers(userFound);

    return {
      ...userFound,
      token,
    };
  } catch (error) {
    throw {
      message: 'Error el correo o contraseña',
      status: StatusCodes.BAD_REQUEST,
      error,
    };
  }
};
