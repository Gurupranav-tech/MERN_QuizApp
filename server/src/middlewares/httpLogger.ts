import morgan from "morgan";
import Logger from "../utils/logger";

// Create the morgan middleware with custom logger for logging messages
const morganMiddleware = morgan("dev", {
  stream: {
    write: (msg: string) => Logger.info(msg),
  },
});

export default morganMiddleware;
