import { DataTypes } from "sequelize";
import database from "../config/database.js";

// Defining the "borrowing" table
const Borrowing = database.define(
  "borrowing",
  {
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    book_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    createdAt: "borrow_date",
    updatedAt: false,
    deletedAt: "return_date",
  }
);

export default Borrowing;
