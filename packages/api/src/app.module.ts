import { Module } from "@nestjs/common";
import { TreesModule } from "./trees/trees.module";

@Module({
  imports: [TreesModule],
})
export class AppModule {}
