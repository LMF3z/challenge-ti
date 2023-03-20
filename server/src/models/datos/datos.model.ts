import { DataTypes, Model } from 'sequelize';
import { DatosI, DatosInputI } from '../../entities/datos.entity';
import { sequelize } from '../../config/database';

class DatosModel extends Model<DatosI, DatosInputI> {
  id?: number;
  name!: string;
  descriptions!: string;
  price!: number;
  avatar!: string;
  with_delivery!: boolean;
  brand!: string;
  category!: string;
  stock!: number;
  rating!: number;
  cities!: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

DatosModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    with_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cities: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: 'datos',
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    sequelize,
  }
);

export default DatosModel;
