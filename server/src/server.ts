import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import httpLogger from "./middlewares/httpLogger";
import AuthRouter from "./routes/auth";
import QuizRouter from "./routes/quiz";
import { NODE_ENV, PORT } from "./config";
import { connect as connectToMongoDB } from "./db/connect";
import Logger from "./utils/logger";

// Connect to mongodb database
try {
  Logger.info("Attempting to connect to mongodb");
  await connectToMongoDB();
} catch (err) {
  Logger.error("Error connecting to mongodb\n" + err);
  process.exit(1);
}
Logger.info("Connected to mongodb");

// Create the server using express
const app = express();

// Add all the requried middlewares both in production and development mode via NODE_ENV env var
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === "development") {
  app.use(httpLogger);
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );
}

// Add all the routes
app.use("/api/auth", AuthRouter);
app.use("/api/quiz", QuizRouter);

// Start the server
app.listen(PORT, () => Logger.info(`Server started on port ${PORT}`));
