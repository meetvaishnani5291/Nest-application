import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../../entities/product.entity';
import { ProductModule } from '../product/product.module';
import { TransactionModule } from '../transaction/transaction.module';
import { UserModule } from '../user/user.module';
import { OrderDetails } from '../../entities/orderDetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderDetails]),
    AuthModule,
    UserModule,
    ProductModule,
    TransactionModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
