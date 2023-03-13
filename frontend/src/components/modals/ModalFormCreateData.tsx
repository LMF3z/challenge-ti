import { ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react';
import Switch from 'react-switch';
import Input from '../Input';
import Button from '../Button';
import { DatosI } from '../../entities/datos.entity';
import { AppContext } from '../../contexts/DataProvider';
import { actionsTypes } from '../../contexts/actions.types';
import Loader from '../Loader/Loader';
import { registerNewDataApi, updateDatoApi } from '../../API/datos.api';

interface Props {
  toggleCloseModal: () => void;
}

const ModalFormCreateData = ({ toggleCloseModal }: Props) => {
  const { state, dispatch } = useContext(AppContext);

  const [dataForm, setDataForm] = useState<DatosI>({
    name: '',
    descriptions: '',
    price: 0,
    avatar: '',
    with_delivery: false,
    brand: '',
    category: 'salud',
    stock: 0,
    rating: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (state.isEditMode) {
      setDataForm(state.dataToEdit);
    }
  }, [state.isEditMode]);

  const handleChangeForm = ({
    target: { name, value },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSendNewData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');
    dispatch({ type: actionsTypes.TOGGLE_LOADING });

    if (state.isEditMode) {
      handleEditData();
      return;
    }

    const response = await registerNewDataApi(dataForm);

    dispatch({ type: actionsTypes.TOGGLE_LOADING });

    if (response?.error) {
      setErrorMessage(response?.error);
      return;
    }

    setDataForm({
      name: '',
      descriptions: '',
      price: 0,
      avatar: '',
      with_delivery: false,
      brand: '',
      category: 'salud',
      stock: 0,
      rating: 0,
    });
    toggleCloseModal();
  };

  const handleEditData = async () => {
    const response = await updateDatoApi(dataForm);

    dispatch({ type: actionsTypes.TOGGLE_LOADING });

    if (response?.error) {
      setErrorMessage(response?.error);
      return;
    }

    setDataForm({
      name: '',
      descriptions: '',
      price: 0,
      avatar: '',
      with_delivery: false,
      brand: '',
      category: 'salud',
      stock: 0,
      rating: 0,
    });

    dispatch({ type: actionsTypes.RESET_STATE });
    toggleCloseModal();
  };

  return (
    <>
      <form
        className='w-full max-h-[90vh] overflow-auto py-5 px-3 flex flex-col items-center gap-3'
        autoComplete='off'
        onSubmit={handleSendNewData}
      >
        <Input label='Nombre'>
          <input
            type='text'
            name='name'
            value={dataForm.name}
            onChange={handleChangeForm}
          />
        </Input>
        <Input label='Descripción'>
          <textarea
            name='descriptions'
            id=''
            cols={30}
            rows={5}
            className='resize-none'
            onChange={handleChangeForm}
            value={dataForm.descriptions}
          ></textarea>
        </Input>

        <Input label='Precio'>
          <input
            type='number'
            step={0.01}
            min={0}
            name='price'
            value={dataForm.price}
            onChange={handleChangeForm}
          />
        </Input>

        <Input label='Avatar'>
          <input
            type='url'
            name='avatar'
            value={dataForm.avatar}
            onChange={handleChangeForm}
          />
        </Input>

        <Input label='Con delivery'>
          <Switch
            className='react-switch'
            onChange={() => {
              setDataForm({
                ...dataForm,
                ['with_delivery']: !dataForm.with_delivery,
              });
            }}
            checked={dataForm.with_delivery}
            // offColor={colors.placeholderColor}
            onColor={'#0071e2'}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </Input>

        <Input label='Marca'>
          <input
            type='text'
            name='brand'
            value={dataForm.brand}
            onChange={handleChangeForm}
          />
        </Input>

        <Input label='Categoria'>
          <select name='category' defaultValue={dataForm.category}>
            <option value='gamer' selected>
              Gamer
            </option>
            <option value='computadoras'>Computadoras</option>
            <option value='salud'>Salud</option>
            <option value='Ropa'>Ropa</option>
            <option value='deportes'>Deportes</option>
          </select>
        </Input>

        <Input label='Cantidad'>
          <input
            type='number'
            step={0.01}
            min={0}
            name='stock'
            value={dataForm.stock}
            onChange={handleChangeForm}
          />
        </Input>

        <Input label='Calificación'>
          <input
            type='range'
            min={1}
            max={5}
            step={1}
            name='rating'
            value={dataForm.rating}
            onChange={handleChangeForm}
          />
        </Input>
        <Button>{state.isEditMode ? ' Actualizar ' : 'Registrar'}</Button>
      </form>
      {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      {<Loader isLoading={state.isLoading} />}
    </>
  );
};

export default ModalFormCreateData;
