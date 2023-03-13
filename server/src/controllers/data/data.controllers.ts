import { Request, Response } from 'express';
import { DatosI } from '../../entities/datos.entity';
import {
  deleteDatoById,
  getDataById,
  getDataList,
  registerNewData,
  updateDatoById,
} from '../../repository/datos/datos.repository';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandlerI } from '../../entities/error.entity';

export const createNewDatoController = async (req: Request, res: Response) => {
  try {
    const body: DatosI = req.body;

    const saved = await registerNewData(body);

    res.status(StatusCodes.OK).json(saved);
  } catch (error) {
    const newError = error as ErrorHandlerI;
    res.status(500).json(newError);
  }
};

export const getDatoByIdController = async (req: Request, res: Response) => {
  try {
    const { id_dato } = req.query;

    const data = await getDataById(Number(id_dato));

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    const newError = error as ErrorHandlerI;
    res.status(500).json(newError);
  }
};

export const getDatosListController = async (req: Request, res: Response) => {
  try {
    const { offset } = req.query;

    const data = await getDataList(Number(offset));

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    const { message } = error as Error;

    console.log(`error controller ------> ${message}`);

    const newError = error as ErrorHandlerI;
    newError.data = [];
    res.status(500).json(newError);
  }
};

export const updatedDatoController = async (req: Request, res: Response) => {
  try {
    const body: DatosI = req.body;

    const updated = await updateDatoById(body);

    res.status(StatusCodes.OK).json({
      message: 'Dato actualizado exitosamente.',
      data: updated,
    });
  } catch (error) {
    const newError = error as ErrorHandlerI;
    res.status(500).json(newError);
  }
};

export const deletedDatoController = async (req: Request, res: Response) => {
  try {
    const { id_dato } = req.query;

    const deleted = await deleteDatoById(Number(id_dato));

    res.status(StatusCodes.OK).json({
      message: 'Dato eliminado exitosamente.',
      data: deleted,
    });
  } catch (error) {
    const newError = error as ErrorHandlerI;
    res.status(500).json(newError);
  }
};
