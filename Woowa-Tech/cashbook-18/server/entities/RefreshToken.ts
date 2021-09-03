import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('refresh_token')
export default class RefreshToken {
  @OneToOne(() => User, { primary: true })
  @JoinColumn({ name: 'id' })
  user!: User;

  @Column({ type: 'varchar', length: 300 })
  token!: string;
}
