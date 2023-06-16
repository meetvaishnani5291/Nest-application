import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { Order } from './entities/order.entity';
import { OrderDetails } from './entities/orderDetail.entity';
import { OrderModule } from './modules/order/order.module';
import { Product } from './entities/product.entity';
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerExceptionFilter } from './exception-filters/logging.exception-filter';
import { CommonResponseInterceptor } from './interceptors/commonResponse.interceptor';
import { AuthGuard } from './guards/auth.guard';
import configuration from './config/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: configuration,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB.HOST'),
        port: parseInt(configService.get<string>('DB.PORT')),
        username: configService.get<string>('DB.USERNAME'),
        password: configService.get<string>('DB.PASSWORD'),
        database: configService.get<string>('DB.NAME'),
        entities: [User, Product, Order, OrderDetails],
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT.SECRET'),
        signOptions: { expiresIn: '1d' },
        // global: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    TransactionModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LoggerExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

function getEnvFilePath(): string {
  const ENVIRONMENT = process.env.ENVIRONMENT;

  if (ENVIRONMENT === 'production') {
    return '.env';
  } else if (ENVIRONMENT === 'test') {
    return '.env.test';
  } else if (ENVIRONMENT === 'devlopment') {
    return '.env';
  }
}
