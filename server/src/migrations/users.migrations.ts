import {
  encryptPassword,
  encryptData,
} from '../helpers/handlerPassword.helper';
import UsersModel from '../models/usersModels/users.model';

export const saveUsersSeeds = () => {
  return Promise.all([
    UsersModel.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        alias: 'admin',
        name: 'Juan',
        last_name: 'Perez',
        email: 'juan.perez@gmail.com',
        password: encryptData(encryptPassword('juanpassword123*.')),
        role: 'admin',
      },
    }),
    UsersModel.findOrCreate({
      where: {
        id: 2,
      },
      defaults: {
        alias: 'visitor',
        name: 'Pedro',
        last_name: 'Álvares',
        email: 'pedro.alvares@gmail.com',
        password: encryptData(encryptPassword('pedropassword123*.')),
        role: 'visitor',
      },
    }),
  ]);
};
