import { Dispatch, SetStateAction } from 'react';
import { DatosI } from './datos.entity';
import { actionsTypes } from '../contexts/actions.types';

export type StateApp = {
  dataList: {
    count: number;
    rows: DatosI[];
  };
  isLoading: boolean;
  isEditMode: boolean;
  dataToEdit: DatosI;
};

export type ReducerActionsType =
  | { type: actionsTypes.GET_DATA_LIST; payload: any }
  | {
      type: actionsTypes.SET_DATA_LIST;
      payload: { count: number; rows: DatosI[] };
    }
  | { type: actionsTypes.TOGGLE_LOADING; payload: boolean }
  | { type: actionsTypes.SENT_NEW_DATA; payload: any }
  | { type: actionsTypes.SELECT_DATA_TO_EDIT; payload: DatosI }
  | { type: actionsTypes.RESET_STATE; payload: any };
