import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import History from './History';
import UserPayment from './UserPayment';
import UserCategory from './UserCategory';
import RefreshToken from './RefreshToken';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  githubUser!: string;

  @CreateDateColumn({ type: 'datetime', default: () => '(CURRENT_DATE)' })
  createdAt!: Date;

  @OneToMany(() => History, (history) => history.user)
  histories!: History[];

  @OneToMany(() => UserPayment, (userPayment) => userPayment.user)
  userPayment!: UserPayment[];

  @OneToMany(() => UserCategory, (userCategory) => userCategory.user)
  userCategory!: UserCategory[];

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
  token!: RefreshToken;
}
