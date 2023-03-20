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
  cities: string;
  observaciones: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
