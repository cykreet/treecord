import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { RedisCache } from "../caches/RedisCache";

export interface RedisCacheInterceptorOptions {
  namespace: string;
  expirySeconds?: number;
}

export class RedisCacheInterceptor implements NestInterceptor {
  private readonly redisCache: RedisCache<any>;

  constructor(options: RedisCacheInterceptorOptions) {
    this.redisCache = new RedisCache(options.namespace, options.expirySeconds);
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const pathArray = request.routerPath.split("/");
    const value = pathArray[0] ? pathArray[pathArray.length] : "value";
    const cached = await this.redisCache.get(value);
    if (cached) return of(cached);

    return next.handle().pipe(
      tap((data) => {
        this.redisCache.set(value, data);
      })
    );
  }
}
