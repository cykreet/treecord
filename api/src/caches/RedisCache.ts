import { getRedisConnection } from "../helpers";

export class RedisCache<Type> {
  private readonly namespace: string;
  private readonly expirySeconds: number | undefined;
  private client = getRedisConnection();

  constructor(namespace: string, expirySeconds?: number) {
    this.namespace = namespace;
    this.expirySeconds = expirySeconds;
  }

  async get(key: string): Promise<Type | undefined> {
    const prefixedKey = this.getPrefixedKey(key);
    const data = await this.client.get(prefixedKey);
    if (data == null) return;
    return JSON.parse(data);
  }

  async set(key: string, data: Type, expirySeconds = this.expirySeconds): Promise<boolean> {
    if (data == null) return false;
    const prefixedKey = this.getPrefixedKey(key);
    const value = JSON.stringify(data);
    if (expirySeconds) await this.client.set(prefixedKey, value, "EX", expirySeconds);
    else await this.client.set(prefixedKey, value);
    return true;
  }

  private getPrefixedKey(key: string) {
    return `${this.namespace}:${key}`;
  }
}
