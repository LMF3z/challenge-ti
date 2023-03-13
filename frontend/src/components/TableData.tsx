import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/DataProvider';
import { actionsTypes } from '../contexts/actions.types';
import { deleteDatoApi, getDatosApi } from '../API/datos.api';
import useAuth from './hooks/useAuthProvider';
import { showDateAndHoursFromISOString } from '../helpers/handleTime.helper';
import Loader from './Loader/Loader';
import Button from './Button';
import { UserRole } from '../entities/users.entity';
import ContainerModal from './modals/ContainerModal';
import ModalFormCreateData from './modals/ModalFormCreateData';
import { DatosI } from '../entities/datos.entity';
import usePaginate from './hooks/usePaginate';
import PaginateComponent from './PaginateComponent';

const TableData = () => {
  const { isAuth } = useAuth();
  const { statePaginate, SetNumPages, handleNextAndPreviewsPage } =
    usePaginate();

  const { state, dispatch } = useContext(AppContext);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (!isOpenModal) {
      handleGetDataList();
    }
  }, [isOpenModal]);

  useEffect(() => {
    handleGetDataList();
  }, [dispatch, statePaginate.offset]);

  const toggleModalCreateNewData = () => setIsOpenModal(!isOpenModal);

  const handleGetDataList = async () => {
    dispatch({ type: actionsTypes.GET_DATA_LIST });

    const response = await getDatosApi(statePaginate.offset);

    if (response?.error) {
      setErrorMessage(response?.error);
      dispatch({ type: actionsTypes.TOGGLE_LOADING });
      return;
    }

    SetNumPages(response.count);
    dispatch({ type: actionsTypes.SET_DATA_LIST, payload: response });
  };

  const handleToEditData = async (data: DatosI) => {
    dispatch({ type: actionsTypes.SELECT_DATA_TO_EDIT, payload: data });
    toggleModalCreateNewData();
  };

  const handleDeleteData = async (id_dato: number) => {
    dispatch({ type: actionsTypes.TOGGLE_LOADING });

    const response = await deleteDatoApi(id_dato);

    dispatch({ type: actionsTypes.TOGGLE_LOADING });

    if (response?.error) {
      setErrorMessage(response?.error);
      return;
    }

    alert('Dato eliminado exitosamente.');
    handleGetDataList();
  };

  return (
    <>
      <ContainerModal
        isOpen={isOpenModal}
        toggleModal={toggleModalCreateNewData}
      >
        <ModalFormCreateData toggleCloseModal={toggleModalCreateNewData} />
      </ContainerModal>

      <div className='w-full'>
        {errorMessage && (
          <p className='text-center text-red-600 m-auto'>{errorMessage}</p>
        )}
        {<Loader isLoading={state.isLoading} />}

        <div className='flex flex-wrap items-center'>
          <div className='w-full px-4 max-w-full flex-grow flex items-center justify-between'>
            <h3 className='font-semibold text-lg p-4 m-0'>Datos Table</h3>
            {isAuth?.role.toLowerCase() === UserRole.admin.toLowerCase() && (
              <div className='w-32'>
                <Button handleClick={toggleModalCreateNewData}>Crear</Button>
              </div>
            )}
          </div>
        </div>

        <PaginateComponent
          pageCount={statePaginate.pageCount}
          actualPage={statePaginate.actualPage}
          handleChangePage={handleNextAndPreviewsPage}
        />

        <div className='overflow-auto rounded-lg shadow'>
          {state.dataList.rows.length > 0 && (
            <table className='w-full'>
              <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className='bg-white'>
                  <th className='w-16 p-3 text-sm font-semibold tracking-wide text-left'>
                    Id
                  </th>
                  <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>
                    Avatar
                  </th>
                  <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>
                    Nombre
                  </th>
                  <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>
                    Descripción
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Precio
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Con delivery
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Marca
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Categoría
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Cantidad
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Calificación
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                    Fecha
                  </th>
                  {isAuth?.role.toLowerCase() ===
                    UserRole.admin.toLowerCase() && (
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {state.dataList.rows.map((data, index) => (
                  <tr
                    key={data.id}
                    className={`${
                      index % 2 === 1 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.id}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      <img src={data.avatar} alt='' className='' />
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.name}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.descriptions}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.price}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.with_delivery ? 'Con delivery' : 'Sin delivery'}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.brand}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.category}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.stock}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {data.rating}
                    </td>
                    <td className='p-3 text-sm text-gray-700 white-space-nowrap'>
                      {showDateAndHoursFromISOString(data?.createdAt!)}
                    </td>
                    {isAuth?.role.toLowerCase() ===
                      UserRole.admin.toLowerCase() && (
                      <td className='p-3 text-sm text-gray-700 white-space-nowrap flex flex-col gap-2'>
                        <Button handleClick={() => handleToEditData(data)}>
                          Editar
                        </Button>
                        <Button
                          classes='bg-red-600'
                          handleClick={() => handleDeleteData(data.id!)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default TableData;
