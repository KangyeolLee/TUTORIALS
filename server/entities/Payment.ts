import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserPayment from './UserPayment';

@Entity('payment')
export default class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  type!: string;

  @OneToMany(() => UserPayment, (userPayment) => userPayment.payment)
  userPayment!: UserPayment[];
}
