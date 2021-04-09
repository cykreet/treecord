import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { RedisCacheInterceptor } from "../../interceptors/RedisCacheInterceptor";
import { DonationsService } from "./donations.service";

// @UseInterceptors(
//   new RedisCacheInterceptor({
//     namespace: "donations",
//     expirySeconds: 2 * 60,
//   })
// )
@Controller("donations")
export class DonationsController {
  constructor(private donationsService: DonationsService) {}

  @Get("top")
  async getTopDonations(@Query("limit") limit: number) {
    return this.donationsService.getTopDonations(limit);
  }

  @Get("recent")
  async getRecentDonations(@Query("limit") limit: number) {
    return this.donationsService.getRecentDonations(limit);
  }
}
