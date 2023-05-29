import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { logger } from 'src/utils/logger';

@Catch()
export class LoggerExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const logObject =
      this.configService.get<string>('ENVIRONMENT') === 'devlopment'
        ? { exception, path: exception.stack }
        : { exception };

    if (exception instanceof BadRequestException) {
      logger.info(logObject);
    } else {
      logger.error(logObject);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    let responseBody;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
    } else {
      const responseBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Somethig went wrong!',
        error: 'Internal Server Error',
      };
    }
    response.status(statusCode).json(responseBody);
  }
}
