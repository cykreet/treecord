import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { DonationsController } from "./donations.controller";
import { DonationsService } from "./donations.service";

@Module({
  controllers: [DonationsController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    DonationsService,
  ],
  exports: [],
  imports: [
    CacheModule.register({
      ttl: 60,
    }),
  ],
})
export class DonationsModule {}
