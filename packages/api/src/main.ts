import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@uproot/common";
import createApp from "fastify";
import helmet from "fastify-helmet";
import { AppModule } from "./app.module";
import { API_PORT } from "./constants";

async function bootstrap() {
  const logger = new Logger("API");
  const fastify = createApp();
  const adapter = new FastifyAdapter(fastify as any);
  fastify.register(helmet);

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, { logger });
  await app.listen(API_PORT, (error, address) => {
    logger.log(`Listening at ${address}`);
  });
}

bootstrap();
