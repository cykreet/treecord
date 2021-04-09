import { Module } from "@nestjs/common";
import { DonationsController } from "./donations.controller";
import { DonationsService } from "./donations.service";

@Module({
  controllers: [DonationsController],
  providers: [DonationsService],
  exports: [],
  imports: [],
})
export class DonationsModule {}
