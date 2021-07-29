import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity('history')
export default class History {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @Column({ type: 'varchar', length: 50 })
  payment!: string;

  @Column({ type: 'int', unsigned: true })
  price!: number;

  @Column({ type: 'varchar', length: 50 })
  content!: string;

  @Column({ type: 'tinyint' })
  type!: number;

  @CreateDateColumn({ type: 'datetime', default: () => '(CURRENT_DATE)' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.histories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;
}
