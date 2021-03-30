import { config } from "dotenv-safe";
import { sync } from "find-up";

if (process.env.NODE_ENV !== "production") {
  config({ example: sync(".env.example"), path: sync(".env") });
}

export const NODE_ENV = process.env.NODE_ENV;
export const CLIENT_ID = process.env.CLIENT_ID;
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_PRODUCTION = NODE_ENV === "production";

export const API_PORT = +(process.env.API_PORT ?? 9000);
