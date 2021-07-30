import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Category from './Category';

@Entity('user_category')
export default class UserCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  color!: string;

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
