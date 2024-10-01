import { config as dotenvConfig } from "dotenv";
import path from "path";

// Configure dotenv to fetch env variables
dotenvConfig({
  path: path.resolve(process.cwd(), "./.env"),
});

export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const PORT: number = +(process.env.PORT || "") || 5000;
