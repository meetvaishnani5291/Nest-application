import { Product } from 'src/modules/product/product.entity';
import { User } from 'src/modules/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

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
