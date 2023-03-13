import { StateApp, ReducerActionsType } from '../../entities/stateApp.entity';
import { actionsTypes } from '../actions.types';
import { InitialState } from '../DataProvider';

export const reducer = (
  state: StateApp = InitialState,
  { type, payload }: ReducerActionsType
) => {
  switch (type) {
    case actionsTypes.GET_DATA_LIST:
      return {
        ...state,
        isLoading: true,
      };

    case actionsTypes.SET_DATA_LIST:
      return {
        ...state,
        isLoading: false,
        dataList: payload,
      };

    case actionsTypes.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }

    case actionsTypes.SELECT_DATA_TO_EDIT: {
      return {
        ...state,
        isEditMode: true,
        dataToEdit: payload,
      };
    }

    case actionsTypes.RESET_STATE: {
      return {
        dataList: {
          count: 0,
          rows: [],
        },
        isLoading: false,
        isEditMode: false,
        dataToEdit: {
          name: '',
          descriptions: '',
          price: 0,
          avatar: '',
          with_delivery: false,
          brand: '',
          category: 'salud',
          stock: 0,
          rating: 0,
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
};
