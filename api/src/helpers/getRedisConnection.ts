import { Logger } from "@treecord/common";
import Redis from "ioredis";
import { REDIS_URI } from "../constants";

let connection: Redis.Redis;

export function getRedisConnection() {
  if (connection) return connection;
  const logger = new Logger({ name: Redis.name });
  connection = new Redis(REDIS_URI, { enableAutoPipelining: true });
  connection.on("connect", () => logger.info("Connected to Redis client."));
  return connection;
}
