import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { RedisCacheInterceptor } from "../../interceptors/RedisCacheInterceptor";
import { TreesService } from "./trees.service";

@UseInterceptors(
  new RedisCacheInterceptor({
    namespace: "totalTrees",
    expirySeconds: 60,
  })
)
@Controller("trees")
export class TreesController {
  constructor(private treesService: TreesService) {}

  @Get()
  async getTotalTrees() {
    return this.treesService.getTotalTrees();
  }
}
