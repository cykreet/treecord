import { Global, Module } from "@nestjs/common";
import { DataService } from "./data.service";

@Global()
@Module({
  controllers: [],
  providers: [DataService],
  exports: [DataService],
  imports: [],
})
export class DataModule {}
