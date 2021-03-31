import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { REPO_URL } from "@treecord/common";
import { FastifyReply } from "fastify";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    if (exception.getStatus() === 404) response.redirect(REPO_URL);
  }
}
