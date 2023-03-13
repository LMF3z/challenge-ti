import { Optional } from 'sequelize';

export interface UsersI {
  id?: number;
  alias: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UsersInput extends Optional<UsersI, 'id'> {}

export enum UserRole {
  admin = 'ADMIN',
  visitor = 'VISITOR',
}
