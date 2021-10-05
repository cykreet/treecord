import { Controller, Get } from "@nestjs/common";
import { TreesService } from "./trees.service";

@Controller("trees")
export class TreesController {
  constructor(private treesService: TreesService) {}

  @Get()
  public async totalTrees(): Promise<number> {
    return this.treesService.getTotalTrees();
  }
}
