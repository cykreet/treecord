import { Controller, Get } from "@nestjs/common";

@Controller("donations")
export class DonationsController {
  @Get("recent")
  getRecentDonations() {}

  @Get("top")
  getTopDonations() {}
}
