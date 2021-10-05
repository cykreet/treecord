import { HttpStatus, Injectable } from "@nestjs/common";
import { load } from "cheerio";
import { request } from "undici";
import { SOURCE_URL } from "../constants";

@Injectable()
export class TreesService {
  public async getTotalTrees(): Promise<number> {
    // todo: move to separate service
    const response = await request(SOURCE_URL);
    if (response.statusCode !== HttpStatus.OK) throw new Error("Failed to retreive data.");
    const data = await response.body.text();

    const $ = load(data);
    const trees = $("#totalTrees").attr("data-count");
    if (!trees) throw new Error("Failed to scrape total trees amount.");
    return +trees;
  }
}
