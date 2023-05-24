import { Product } from 'src/product/product.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetails {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  orderId: number;
  //   @PrimaryColumn()s
  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  //   @PrimaryColumn()
  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  quantity: number;
}
