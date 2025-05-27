/** @format */

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { logger } from "./middleware/logger.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(logger);
app.use(cors());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
