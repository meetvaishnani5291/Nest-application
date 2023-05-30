import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { errorResponseDto } from 'src/DTOs/error.dto';
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
    let statusCode: number;
    let responseBody: errorResponseDto;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseBody = exception.getResponse() as errorResponseDto;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode,
        message: 'Somethig went wrong!',
        error: 'Internal Server Error',
      };
    }

    response.status(statusCode).json(responseBody);
  }
}
