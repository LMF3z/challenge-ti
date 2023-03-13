export interface UsersI {
  id?: number;
  alias: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum UserRole {
  admin = 'ADMIN',
  visitor = 'VISITOR',
}
