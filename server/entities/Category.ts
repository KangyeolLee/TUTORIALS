import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserCategory from './UserCategory';

@Entity('category')
export default class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  type!: string;

  @OneToMany(() => UserCategory, (userCategory) => userCategory.category)
  userCategory!: UserCategory[];
}
