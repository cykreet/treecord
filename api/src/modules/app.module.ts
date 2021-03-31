import { Module } from "@nestjs/common";
import { DonationsModule } from "./donations/donations.module";
import { TreesModule } from "./trees/trees.module";

@Module({
  imports: [TreesModule, DonationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
