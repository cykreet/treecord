import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataService } from "../data";
import { APITrees } from "./trees.types";

@Injectable()
export class TreesService {
  constructor(private dataService: DataService) {}

  async getTotalTrees(): Promise<APITrees> {
    const $ = await this.dataService.fetchBody();
    const trees = $("#totalTrees").attr("data-count");
    if (!trees) throw new InternalServerErrorException();
    return { trees: +trees };
  }
}
