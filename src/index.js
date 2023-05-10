import express from "express";
import dotenv from "dotenv";
import migration from "./config/migration.js";

dotenv.config();

const app = express();

await migration();

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
