import { Injectable, InternalServerErrorException } from "@nestjs/common";
import cheerio from "cheerio";
import fetch from "node-fetch";
import { RedisCache } from "@treecord/common";
import { TEAMTREES } from "../../constants";

@Injectable()
export class DataService {
  private readonly bodyCache = new RedisCache<string>("body");

  async fetchBody() {
    const cached = await this.bodyCache.get("value");
    if (cached) return cheerio.load(cached);

    const response = await fetch(TEAMTREES);
    if (!response.ok) throw new InternalServerErrorException();
    const body = await response.text();
    this.bodyCache.set("value", body);
    return cheerio.load(body);
  }
}
