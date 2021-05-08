import { CacheInterceptor, Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { DonationsService } from "./donations.service";

@UseInterceptors(CacheInterceptor)
@Controller("donations")
export class DonationsController {
  constructor(private donationsService: DonationsService) {}

  @Get("top")
  public async getTopDonations(@Query("limit") limit: number) {
    return this.donationsService.getTopDonations(limit);
  }

  @Get("recent")
  public async getRecentDonations(@Query("limit") limit: number) {
    return this.donationsService.getRecentDonations(limit);
  }
}
