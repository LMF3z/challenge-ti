import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { UsersI, UsersInput } from '../../entities/users.entity';

class UsersModel extends Model<UsersI, UsersInput> {
  id?: number;
  alias!: string;
  name!: string;
  last_name!: string;
  email!: string;
  password!: string;
  role!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    sequelize,
  }
);

export default UsersModel;
