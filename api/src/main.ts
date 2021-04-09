import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@treecord/common";
import fastifyHelmet from "fastify-helmet";
import fastifyRateLimit from "fastify-rate-limit";
import { API_PORT } from "./constants";
import { HttpExceptionFilter } from "./filters/HttpExceptionFilter";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const logger = new Logger({ name: "API" });
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { logger });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // something isn't right... somewhere, so for now we're forced to
  // register fastify plugins "as any"
  await app.register(fastifyHelmet as any);
  await app.register(fastifyRateLimit as any, {
    max: 10, // time window defaults to 1 minute
    allowList: ["127.0.0.1"],
  });
  await app.listen(API_PORT);
  logger.debug(`Ready at ${await app.getUrl()}`);
}

bootstrap();
