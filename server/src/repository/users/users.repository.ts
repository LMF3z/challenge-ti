import { StatusCodes } from 'http-status-codes';
import { UsersI } from '../../entities/users.entity';
import UsersModel from '../../models/usersModels/users.model';

/**
 * @param email
 * @returns user data
 */
export const getUserByEmail = async (email: string): Promise<UsersI> => {
  try {
    const user = await UsersModel.findOne({
      where: {
        email,
      },
    });

    return user?.dataValues!;
  } catch (error) {
    throw {
      message: 'Error el correo o contraseña',
      status: StatusCodes.BAD_REQUEST,
      error,
    };
  }
};
