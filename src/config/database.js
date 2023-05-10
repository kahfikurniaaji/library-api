import { Sequelize } from "sequelize";

// Configuring Postgresql database using Sequelize.
// const sequelize = new Sequelize(
//   process.env.PGDATABASE,
//   process.env.PGUSER,
//   process.env.PGPASSWORD,
//   {
//     host: process.env.PGHOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );

// Configuring Postgresql database using Sequelize.
const sequelize = new Sequelize("libraries", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

export default sequelize;
