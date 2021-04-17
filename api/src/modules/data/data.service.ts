import { Injectable, InternalServerErrorException } from "@nestjs/common";
import cheerio from "cheerio";
import fetch from "node-fetch";
import { TEAMTREES } from "../../constants";

@Injectable()
export class DataService {
  // todo: cache with redis, mostly just waiting for sylo digital
  // caching library
  async fetchBody() {
    const response = await fetch(TEAMTREES);
    if (!response.ok) throw new InternalServerErrorException();
    const body = await response.text();
    return cheerio.load(body);
  }
}
