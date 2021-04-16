import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Logger, REPO_URL } from "@treecord/common";
import { FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger({ name: HttpExceptionFilter.name });

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    if (exception instanceof NotFoundException) return response.redirect(REPO_URL);
    // todo: report through sentry
    if (exception instanceof InternalServerErrorException) {
      this.logger.error(exception);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}
