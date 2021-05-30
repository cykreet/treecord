import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataService } from "../data";

@Injectable()
export class TreesService {
  constructor(private dataService: DataService) {}

  public async getTotalTrees(): Promise<number> {
    const $ = await this.dataService.loadBody();
    const trees = $("#totalTrees").attr("data-count");
    if (!trees) throw new InternalServerErrorException();
    return +trees;
  }
}
