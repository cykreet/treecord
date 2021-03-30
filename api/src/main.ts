import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { API_PORT, IS_PRODUCTION, Logger } from "@treecord/common";
import fastifyHelmet from "fastify-helmet";
import fastifyRateLimit from "fastify-rate-limit";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger({ name: "API" });
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { logger });
  app.useGlobalPipes(new ValidationPipe());
  await app.register(fastifyHelmet as any);
  await app.register(fastifyRateLimit as any, {
    global: true,
    max: IS_PRODUCTION ? 5 : undefined,
  });
  await app.listen(API_PORT);
  logger.debug(`Ready at ${await app.getUrl()}`);
}

bootstrap();
