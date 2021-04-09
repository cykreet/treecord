import { Module } from "@nestjs/common";
import { DataModule } from "./data/data.module";
import { DonationsModule } from "./donations";
import { TreesModule } from "./trees";

@Module({
  imports: [DataModule, TreesModule, DonationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
