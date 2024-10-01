import express from "express";
import cookieParser from "cookie-parser";
import httpLogger from "./middlewares/httpLogger";
import AuthRouter from "./routes/auth";
import { NODE_ENV, PORT } from "./config";
import { connect as connectToDatabase } from "./db/connect";
import Logger from "./utils/logger";

// Connect to database
try {
  await connectToDatabase();
} catch {
  Logger.error("Error connecting to database");
  process.exit(1);
}

// Create the server using express
const app = express();

// Add all the requried middlewares both in production and development mode via NODE_ENV env var
app.use(cookieParser());
app.use(express.json());

if (NODE_ENV === "development") {
  app.use(httpLogger);
}

// Add all the routes
app.use("/auth", AuthRouter);

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
