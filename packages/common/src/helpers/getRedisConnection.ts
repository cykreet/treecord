import Redis from "ioredis";
import { Logger } from "../classes/Logger";
import { REDIS_URI } from "../constants";

let connection: Redis.Redis;

export function getRedisConnection() {
  if (connection) return connection;
  const logger = new Logger(Redis.name);
  connection = new Redis(REDIS_URI, { enableAutoPipelining: true });
  connection.on("connect", () => logger.info("Connected to Redis client."));
  return connection;
}
