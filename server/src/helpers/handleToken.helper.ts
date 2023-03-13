import jwt from 'jsonwebtoken';
import { UsersI } from '../entities/users.entity';

export const signTokenUsers = (dataToToken: Partial<UsersI>): string =>
  jwt.sign(dataToToken, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

/**
 * @param token String
 * @returns boolean correct token or not
 */
export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!);
