import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { OrderDetails } from './entities/orderDetail.entity';
import { ProductModule } from 'src/product/product.module';
import { TransactionModule } from 'src/transaction/transaction.module';

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
