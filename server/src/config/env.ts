import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../../");
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({
  path: path.join(rootDir, envFile),
});

export const env = {
  PORT: Number(process.env.PORT)!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT)!,
  DB_NAME: process.env.DB_NAME!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  SESSION_SECRET: process.env.SESSION_SECRET!,
  NODE_ENV: process.env.NODE_ENV!,
};
