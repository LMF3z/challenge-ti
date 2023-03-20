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
    category: 'gamer',
    cities: '',
    stock: 0,
    rating: 0,
    observaciones: '',
  });
  const [citiesList, setCitiesLis] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (state.isEditMode) {
      setDataForm(state.dataToEdit);
      if (state.dataToEdit.cities.length > 0)
        setCitiesLis(JSON.parse(state.dataToEdit.cities));
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

  const handleMultiSelectCities = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const cityExistIndex = citiesList.findIndex((city) => city === value);

    if (cityExistIndex >= 0) {
      const deleted = citiesList.filter((city) => city !== value);
      setCitiesLis(deleted);
      return;
    }

    setCitiesLis([...citiesList, value]);
  };

  const handleSendNewData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage('');
    dispatch({ type: actionsTypes.TOGGLE_LOADING });

    dataForm.cities = JSON.stringify(citiesList);

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
      cities: '',
      stock: 0,
      rating: 0,
      observaciones: '',
    });
    setCitiesLis([]);
    toggleCloseModal();
  };

  const getCityValueIsSelected = (value: string) =>
    citiesList.some((city) => city === value);

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
      cities: '',
      stock: 0,
      rating: 0,
      observaciones: '',
    });
    setCitiesLis([]);
    dispatch({ type: actionsTypes.RESET_STATE });
    toggleCloseModal();
  };

  return (
    <>
      <form
        className='w-full max-h-[90vh] overflow-auto py-5 flex flex-col items-center gap-3'
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
            <option value='gamer'>Gamer</option>
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

        <div className='w-full max-w-2xl'>
          <Input label='Ciudades'>
            <section className='flex justify-between items-center p-3'>
              <label
                className='cursor-pointer hover:text-green-600'
                htmlFor='city-one'
              >
                Ciudad uno
              </label>
              <input
                className='checkbox'
                type='checkbox'
                name='citiescheck'
                id='city-one'
                value={'city-one'}
                checked={getCityValueIsSelected('city-one')}
                onChange={handleMultiSelectCities}
              />
            </section>
            <section className='flex justify-between items-center p-3'>
              <label
                className='cursor-pointer hover:text-green-600'
                htmlFor='city-two'
              >
                Ciudad dos
              </label>
              <input
                className='checkbox'
                type='checkbox'
                name='citiescheck'
                id='city-two'
                value={'city-two'}
                checked={getCityValueIsSelected('city-two')}
                onChange={handleMultiSelectCities}
              />
            </section>
            <section className='flex justify-between items-center p-3'>
              <label
                className='cursor-pointer hover:text-green-600'
                htmlFor='city-three'
              >
                Ciudad tres
              </label>
              <input
                className='checkbox'
                type='checkbox'
                name='citiescheck'
                id='city-three'
                value={'city-three'}
                checked={getCityValueIsSelected('city-three')}
                onChange={handleMultiSelectCities}
              />
            </section>
          </Input>
        </div>

        <Input label='Observaciones'>
          <textarea
            name='observaciones'
            id=''
            cols={30}
            rows={5}
            className='resize-none'
            onChange={handleChangeForm}
            value={dataForm.observaciones}
          ></textarea>
        </Input>

        <Button>{state.isEditMode ? ' Actualizar ' : 'Registrar'}</Button>
      </form>
      {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      {<Loader isLoading={state.isLoading} />}
    </>
  );
};

export default ModalFormCreateData;
