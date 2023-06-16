import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

function configureSwagger(app: INestApplication, ENVIRONMENT: string) {
  const config = new DocumentBuilder()
    .setTitle('Product Store')
    .setDescription('Product Store API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT token',
        in: 'header',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // if (ENVIRONMENT === 'devlopment')
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(helmet());

  const configService = app.get(ConfigService);
  const ENVIRONMENT = configService.get<string>('ENVIRONMENT');
  const PORT = +configService.get<string>('APP_PORT', '3001');

  configureSwagger(app, ENVIRONMENT);

  await app.listen(PORT);
}
bootstrap();
