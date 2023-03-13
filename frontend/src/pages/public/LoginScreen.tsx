import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../API/login.api';
import useAuth from '../../components/hooks/useAuthProvider';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader/Loader';
import { routes } from '../../routes';

const LoginScreen = () => {
  const { handleLogged } = useAuth();

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const sendLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await loginApi(loginData);

    if (response?.error) {
      setErrorMessage(response?.error);
    }

    setErrorMessage(response?.error);
    setIsLoading(false);
    handleLogged(true, response);
    navigate(routes.home);
  };

  return (
    <section className='w-full min-h-screen flex flex-col justify-center items-center'>
      <h1>Iniciar Sesión</h1>

      {errorMessage && <p className='text-red-600'>{errorMessage}</p>}

      <form
        onSubmit={sendLogin}
        className='w-full py-5 px-3 max-w-lg flex flex-col'
        autoComplete='off'
      >
        <Input label='Correo'>
          <input
            type='email'
            name='email'
            value={loginData.email}
            onChange={handleChange}
            className='bg-white border border-gray-300'
          />
        </Input>
        <Input label='Contraseña'>
          <input
            type='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
            className='bg-white border border-gray-300'
          />
        </Input>

        <Button>Entrar</Button>
      </form>
      <Loader isLoading={isLoading} />
    </section>
  );
};

export default LoginScreen;
