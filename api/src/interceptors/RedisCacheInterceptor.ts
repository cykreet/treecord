import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { RedisCache } from "@treecord/common";
import { FastifyRequest } from "fastify";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

export interface RedisCacheInterceptorOptions {
  namespace: string;
  expirySeconds?: number;
}

// todo: move to memory cache and create decorator for redis cache to be used
// on individual service functions
export class RedisCacheInterceptor implements NestInterceptor {
  private readonly redisCache: RedisCache<any>;

  constructor(options: RedisCacheInterceptorOptions) {
    this.redisCache = new RedisCache(options.namespace, options.expirySeconds);
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const pathArray = request.routerPath.split("/");
    const key = pathArray[0] ? pathArray[pathArray.length] : "value";
    const cached = await this.redisCache.get(key);
    if (cached) return of(cached);

    return next.handle().pipe(
      tap((data) => {
        this.redisCache.set(key, data);
      })
    );
  }
}
