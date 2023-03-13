import { Sequelize } from 'sequelize';

export const sequelize =
  process.env.ENV === 'development'
    ? new Sequelize({
        database: process.env.LOCAL_DB!,
        username: process.env.LOCAL_USER_DB!,
        password: process.env.LOCAL_PASSWORD_DB!,
        host: process.env.LOCAL_HOST_DB!,
        dialect: 'mysql',
        timezone: '-04:30',
      })
    : new Sequelize({
        database: process.env.REMOTE_DB,
        username: process.env.REMOTE_USER_DB,
        password: process.env.REMOTE_PASSWORD_DB,
        host: process.env.REMOTE_HOST_DB,
        dialect: 'mysql',
        timezone: 'America/Caracas',
      });

export default async function ConnectToDb() {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: false, force: false });

    console.log(
      `db ${
        process.env.ENV === 'development'
          ? process.env.LOCAL_DB
          : process.env.REMOTE_DB
      } is connected`
    );
  } catch (error: unknown) {
    const { message } = error as Error;
    throw new Error(message);
  }
}
