import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Category from './Category';

@Entity('user_category')
export default class UserPayment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Category, (category) => category.userCategory, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  category?: Category | null;

  @ManyToOne(() => User, (user) => user.userCategory, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: User | null;
}
