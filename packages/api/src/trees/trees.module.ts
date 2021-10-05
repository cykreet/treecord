import { Module } from "@nestjs/common";
import { TreesController } from "./trees.controller";
import { TreesService } from "./trees.service";

@Module({
  controllers: [TreesController],
  providers: [TreesService],
  exports: [TreesService],
})
export class TreesModule {}
