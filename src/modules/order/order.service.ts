import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetails } from '../../entities/orderDetail.entity';
import { OrderItemDTO } from './dto/CreateOrder.dto';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../product/product.service';
import { TransactionService } from '../transaction/transaction.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productService: ProductService,
    private transactionService: TransactionService,
  ) {}

  async createOrder(orderItems: OrderItemDTO[], user: User) {

    if(orderItems.length === 0)throw new BadRequestException(
      `no order items`,
    );
    // Transaction : START
    const queryRunner = await this.transactionService.startTransaction();

    try {
      const order = queryRunner.manager.create(Order);
      order.customer = user;
      order.orderDate = new Date();
      const placedOrder = await queryRunner.manager.save(Order, order);

      await Promise.all(
        orderItems.map(async (item) => {
          const product = await this.productService.findOneById(item.productId);
          if (!product)
            throw new BadRequestException(
              `product with id: ${item.productId} not found`,
            );
          if (product.quantity < item.quantity)
            throw new BadRequestException(
              `product with id: ${item.productId} has not enough quantity`,
            );
          product.quantity -= item.quantity;
          await queryRunner.manager.save(Product, product);
          return item;
        }),
      );

      const orderDetails = orderItems.map((item) =>
        this.orderDetailsRepository.create({
          orderId: placedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        }),
      );
      await queryRunner.manager.save(OrderDetails, orderDetails);

      // Transaction : COMMIT
      await this.transactionService.commitTransaction(queryRunner);

      return order;
    } catch (error) {
      // Transaction : ROLLBACK
      await this.transactionService.rollbackTransaction(queryRunner);

      throw error;
    }
  }

  async getOrders(user: User) {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');
    const orders = await queryBuilder
      .leftJoinAndSelect('order.products', 'product')
      .leftJoinAndSelect('product.seller', 'seller')
      .where('order.customer = :id', { id: user.id })
      .getMany();
    return orders;
  }
}
