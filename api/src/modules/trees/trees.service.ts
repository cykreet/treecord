import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataService } from "../data";
import { Trees } from "./trees.types";

@Injectable()
export class TreesService {
  constructor(private dataService: DataService) {}

  async getTotalTrees(): Promise<Trees> {
    const $ = await this.dataService.fetchBody();
    const trees = $("#totalTrees").attr("data-count");
    // todo: should probably be automatically reported through a service like sentry
    if (!trees) throw new InternalServerErrorException();
    return { trees: +trees };
  }
}
