import { CacheInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { TreesService } from "./trees.service";

@UseInterceptors(CacheInterceptor)
@Controller("trees")
export class TreesController {
  constructor(private treesService: TreesService) {}

  @Get()
  async getTotalTrees() {
    return this.treesService.getTotalTrees();
  }
}
