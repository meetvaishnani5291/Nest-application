import { Exclude } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  address: string;

  @OneToMany(() => Order, (order) => order.id)
  orders: Order[];
}
