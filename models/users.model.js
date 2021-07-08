import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const User = sequelize.define(
  "users",
  {
    user_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email_address: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        fields: [{ name: "user_id" }],
      },
    ],
  }
);

export default User;
