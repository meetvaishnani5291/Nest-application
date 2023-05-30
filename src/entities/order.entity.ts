import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderDate: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable({ name: 'order_details' })
  products: Product[];
}
