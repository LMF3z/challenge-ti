import { Request, Response } from 'express';
import { ErrorHandlerI } from '../../entities/error.entity';
import { loginServices } from '../../services/auth/login.service';
import { StatusCodes } from 'http-status-codes';

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const loginData = await loginServices(body);

    res.status(StatusCodes.OK).json(loginData);
  } catch (error: unknown) {
    const newError = error as ErrorHandlerI;
    res.status(500).json(newError);
  }
};
