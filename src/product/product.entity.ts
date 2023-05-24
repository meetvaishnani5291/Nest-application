import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToMany(() => Order, (order) => order.id)
  @JoinTable({ name: 'order_details' })
  orders: Order[];
}
