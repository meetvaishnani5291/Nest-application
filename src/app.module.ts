import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { OrderDetails } from './order/entities/orderDetail.entity';
import { TransactionModule } from './transaction/transaction.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

// const connectionOptions: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'Meet@123',
//   database: 'ecommerce',
//   entities: [],
//   synchronize: true,
// };

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Product, Order, OrderDetails],
        // synchronize: true,
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
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
})
export class AppModule {}
