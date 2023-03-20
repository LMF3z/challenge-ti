import { StatusCodes } from 'http-status-codes';
import { limitRequest } from '../../constants/request.constants';
import { DatosI } from '../../entities/datos.entity';
import DatosModel from '../../models/datos/datos.model';

/**
 * @param data
 * @returns data saved
 */
export const registerNewData = async (data: DatosI): Promise<DatosI> => {
  try {
    const saved = await DatosModel.create({ ...data });
    return saved.dataValues!;
  } catch (error) {
    throw {
      message: 'Error el registrar nuevo dato',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

/**
 * @param id_data
 * @returns data of dato
 */
export const getDataById = async (id_data: number): Promise<DatosI> => {
  try {
    const data = await DatosModel.findOne({
      where: {
        id: id_data,
      },
    });
    return data!.dataValues;
  } catch (error) {
    throw {
      message: 'Error el obtener dato',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

/**
 * @returns datos list
 */
export const getDataList = async (
  offset: number
): Promise<{
  count: number;
  rows: DatosI[];
}> => {
  try {
    const { rows, count } = await DatosModel.findAndCountAll({
      offset,
      limit: limitRequest,
    });
    return { rows, count };
  } catch (error) {
    throw {
      message: 'Error el obtener datos',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

/**
 * @param newData
 * @returns data updated
 */
export const updateDatoById = async (
  newData: Partial<DatosI>
): Promise<number> => {
  try {
    const [affected] = await DatosModel.update(newData, {
      where: {
        id: newData.id,
      },
    });

    return affected;
  } catch (error) {
    throw {
      message: 'Error el actualizar dato',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

/**
 * @param id_dato
 * @returns dato deleted
 */
export const deleteDatoById = async (id_dato: number): Promise<number> => {
  try {
    const deleted = await DatosModel.destroy({
      where: {
        id: id_dato,
      },
    });

    return deleted;
  } catch (error) {
    throw {
      message: 'Error el actualizar dato',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};
