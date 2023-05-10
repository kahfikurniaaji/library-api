import { Sequelize } from "sequelize";
import cron from "node-cron";

// Configuring Postgresql database using Sequelize.
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    logging: false,
  }
);

// Configuring Postgresql database using Sequelize.
// const sequelize = new Sequelize("libraries", "postgres", "postgres", {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

const reducePenaltyDaysQuery = `UPDATE borrowing SET penalty_days = penalty_days - 1 WHERE penalty_days > 0`;

cron.schedule("0 0 * * *", async () => {
  try {
    await sequelize.query(reducePenaltyDaysQuery);
    console.log("Penalty days updated successfully");
  } catch (error) {
    console.error("Error updating penalty days:", error.message);
  }
});

export default sequelize;
