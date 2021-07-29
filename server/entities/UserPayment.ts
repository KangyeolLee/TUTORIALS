import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Payment from './Payment';

@Entity('user_payment')
export default class UserPayment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Payment, (payment) => payment.userPayment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  payment?: Payment | null;

  @ManyToOne(() => User, (user) => user.userPayment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: User | null;
}
