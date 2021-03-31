import { Module } from "@nestjs/common";
import { DonationsController } from "./donations.controller";

@Module({
  controllers: [DonationsController],
  providers: [],
  exports: [],
  imports: [],
})
export class DonationsModule {}
