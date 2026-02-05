import { DataTypes } from 'sequelize';

export const baseModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
};
