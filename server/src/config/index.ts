import { config as dotenvConfig } from "dotenv";
import fs from "fs/promises";
import path from "path";

// Configure dotenv to fetch env variables
dotenvConfig({
  path: path.resolve(process.cwd(), "./.env"),
});

// Environment variables
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const PORT: number = +(process.env.PORT || "") || 5000;
export const SESSION_SECRET =
  process.env.SESSION_SECRET || "some super secure session key";
export const PUB_KEY_FILE = process.env.PUB_KEY_FILE || "";
export const PRIV_KEY_FILE = process.env.PRIV_KEY_FILE || "";

// Derived variables
export const PUB_KEY = (
  await fs.readFile(path.join(process.cwd(), PUB_KEY_FILE), "utf-8")
).toString();
export const PRIV_KEY = (
  await fs.readFile(path.join(process.cwd(), PRIV_KEY_FILE), "utf-8")
).toString();
