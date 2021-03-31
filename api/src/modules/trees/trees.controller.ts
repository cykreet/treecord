import { Controller, Get } from "@nestjs/common";

@Controller("trees")
export class TreesController {
  private static readonly TOTAL_TREES_REGEX = /<[a-z]\w+ id="[A-z]\w+" data-count="(?<trees>\d+)" class="(?=.*counter).*">(\d{1,3}(,\d{3})*)<\/[a-z]\w+>/gi;

  @Get()
  getTotalTrees() {}
}
