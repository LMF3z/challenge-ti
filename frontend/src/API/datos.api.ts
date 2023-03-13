import axios from 'axios';
import { UsersI } from '../entities/users.entity';
import { headers } from './index';
import { DatosI } from '../entities/datos.entity';

export const registerNewDataApi = async (data: DatosI) => {
  try {
    const response = await axios.post(`/datos`, data, {
      headers: headers()!,
    });

    return response.data;
  } catch (error: unknown) {
    const newError = error as {
      response: { data: { error: { message: string } } };
    };

    if (newError?.response?.data?.error?.message) {
      return { error: newError?.response?.data?.error?.message };
    }

    return { error: 'Error al crear nuevo dato' };
  }
};

export const getDatosApi = async (offset: number = 0) => {
  try {
    const response = await axios.get(`/datos?offset=${offset}`, {
      headers: headers()!,
    });

    return response.data;
  } catch (error: unknown) {
    const newError = error as {
      response: { data: { error: { message: string } } };
    };

    if (newError?.response?.data?.error?.message) {
      return { error: newError?.response?.data?.error?.message };
    }

    return { error: 'Error al obtener datos' };
  }
};

export const updateDatoApi = async (data: DatosI) => {
  try {
    const response = await axios.put(`/datos`, data, {
      headers: headers()!,
    });

    return response.data;
  } catch (error: unknown) {
    const newError = error as {
      response: { data: { error: { message: string } } };
    };

    if (newError?.response?.data?.error?.message) {
      return { error: newError?.response?.data?.error?.message };
    }

    return { error: 'Error al obtener datos' };
  }
};

export const deleteDatoApi = async (id_dato: number) => {
  try {
    const response = await axios.delete(`/datos?id_dato=${id_dato}`, {
      headers: headers()!,
    });

    return response.data;
  } catch (error: unknown) {
    const newError = error as {
      response: { data: { error: { message: string } } };
    };

    if (newError?.response?.data?.error?.message) {
      return { error: newError?.response?.data?.error?.message };
    }

    return { error: 'Error al obtener datos' };
  }
};
