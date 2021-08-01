import { EntityRepository, InsertResult, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  createUser(email: string): Promise<InsertResult> {
    const user = this.create({ email });
    return this.insert(user);
  }
}
