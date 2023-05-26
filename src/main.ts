import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerExceptionFilter } from './exception-filters/logging.exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommonResponseInterceptor } from './interceptors/commonResponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new LoggerExceptionFilter());
  app.useGlobalInterceptors(new CommonResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('Ecommerce API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
