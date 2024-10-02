import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "passport";
import httpLogger from "./middlewares/httpLogger";
import AuthRouter from "./routes/auth";
import { NODE_ENV, PORT, SESSION_SECRET } from "./config";
import prisma, { connect as connectToMongoDB } from "./db/connect";
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

// Create a storage class for express session
const sessionStore = new PrismaSessionStore(prisma as any, {
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

// Create the server using express
const app = express();

// Add all the requried middlewares both in production and development mode via NODE_ENV env var
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    secret: SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (NODE_ENV === "development") {
  app.use(httpLogger);
}

// Add all the routes
app.use("/auth", AuthRouter);

// Start the server
app.listen(PORT, () => Logger.info(`Server started on port ${PORT}`));
