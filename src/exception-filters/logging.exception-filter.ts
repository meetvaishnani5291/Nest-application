import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { logger } from 'src/utils/logger';

@Catch()
export class LoggerExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const responseBody = exception.getResponse();
    // console.log(exception.);
    if (exception instanceof BadRequestException) {
      logger.info({ exception, path: exception.stack });
    } else {
      logger.error({ exception, path: exception.stack });
    }
    response.status(statusCode).json(responseBody);
  }
}
