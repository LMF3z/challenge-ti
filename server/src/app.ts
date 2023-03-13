import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
dotenv.config();

import ConnectToDb from './config/database';
import { saveUsersSeeds } from './migrations/users.migrations';
import router from './routers';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (_req, res) => {
  return res.json({
    message: 'Hello from server ;)',
  });
});

app.get('/api', (_req, res) => {
  return res.json({
    message: 'Hello from api server ;)',
  });
});

app.use('/api', router);

app.listen(PORT, async () => {
  await ConnectToDb();
  await saveUsersSeeds();
  console.log(`API Listening on port ${PORT}`);
});
