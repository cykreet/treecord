import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Logger } from "@treecord/common";
import createApp from "fastify";
import helmet from "fastify-helmet";
import { AppModule } from "./app.module";
import { API_PORT } from "./constants";

async function bootstrap() {
  const logger = new Logger();
  const fastify = createApp();
  const adapter = new FastifyAdapter(fastify as any);
  fastify.register(helmet);

  const app = await NestFactory.create(AppModule, adapter, { logger });
  await app.listen(API_PORT);
}

bootstrap();
