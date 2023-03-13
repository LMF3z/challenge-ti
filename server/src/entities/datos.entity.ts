import { Optional } from 'sequelize';

export interface DatosI {
  id?: number;
  name: string;
  descriptions: string;
  price: number;
  avatar: string;
  with_delivery: boolean;
  brand: string;
  category: string;
  stock: number;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DatosInputI extends Optional<DatosI, 'id'> {}
