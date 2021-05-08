import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RedisMapCache } from "@sylo-digital/kas";
import { getRedisConnection } from "@treecord/common";
import cheerio from "cheerio";
import fetch from "node-fetch";
import { TEAMTREES } from "../../constants";

@Injectable()
export class DataService {
  private readonly cache = new RedisMapCache<cheerio.Root>(getRedisConnection(), { namespace: "treecord", defaultExpiry: "5s" });

  public async loadBody() {
    const cached = await this.cache.get("data");
    if (cached) return cached;
    const response = await fetch(TEAMTREES);
    if (!response.ok) throw new InternalServerErrorException();

    const body = await response.text();
    const loaded = cheerio.load(body);
    await this.cache.set("data", loaded);
    return loaded;
  }
}
