import { DataTypes } from "sequelize";
import database from "../config/database.js";

// Defining the "members" table
const Member = database.define(
  "members",
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowed_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    penalty_duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    createdAt: "registered_at",
    updatedAt: "updated_at",
    deletedAt: "unregistered_at",
  }
);

export default Member;
