import { config } from "dotenv-safe";
import { sync } from "find-up";

if (process.env.NODE_ENV !== "production") {
  config({ example: sync(".env.example"), path: sync(".env") });
}

export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_PRODUCTION = NODE_ENV === "production";

// could pull repo url from package.json
export const REPO_URL = process.env.REPO_URL ?? "https://github.com/cykreet/treecord";
