import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserRole } from '../entities/users.entity';

export const validateRoleAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.headers;
    const method = req.method;

    if (
      [
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'PATCH',
        'HEAD',
        'OPTIONS',
        'PROPFIND',
        'CUSTOM',
      ].includes(method) &&
      String(role).toLowerCase() === UserRole.visitor.toLowerCase()
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'No tienes permisos para realizar esta acción.',
      });
      return;
    }

    next();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'No tiene permisos para realizar esta acción' });
  }
};
