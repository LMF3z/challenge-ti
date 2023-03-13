import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { StateApp } from '../entities/stateApp.entity';
import * as dataReducer from './reducers/DataReducer';

interface Props {
  children: ReactNode;
}

export const InitialState: StateApp = {
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

export const AppContext = createContext<{
  state: StateApp;
  dispatch: Dispatch<any>;
}>({ state: InitialState, dispatch: () => {} });

const DataProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(dataReducer.reducer, InitialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default DataProvider;
