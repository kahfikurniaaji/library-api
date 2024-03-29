import express from "express";
import dotenv from "dotenv";
import migration from "./config/migration.js";
import router from "./route/index.js";
import errorHandler from "./util/error-handler.js";
import swaggerUI from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();

await migration();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
