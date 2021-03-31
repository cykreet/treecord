import { Module } from "@nestjs/common";
import { TreesController } from "./trees.controller";

@Module({
  controllers: [TreesController],
  providers: [],
  exports: [],
  imports: [],
})
export class TreesModule {}
