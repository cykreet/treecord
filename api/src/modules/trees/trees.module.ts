import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TreesController } from "./trees.controller";
import { TreesService } from "./trees.service";

@Module({
  controllers: [TreesController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    TreesService,
  ],
  exports: [],
  imports: [
    CacheModule.register({
      ttl: 45,
    }),
  ],
})
export class TreesModule {}
