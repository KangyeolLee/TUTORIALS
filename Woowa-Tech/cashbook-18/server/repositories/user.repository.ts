import { EntityRepository, InsertResult, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findById(id: number): Promise<User | undefined> {
    return this.findOne(id);
  }

  findByGithubUser(githubUser: string): Promise<User | undefined> {
    return this.findOne({ githubUser });
  }

  createUser(githubUser: string): Promise<InsertResult> {
    const user = this.create({ githubUser });
    return this.insert(user);
  }
}
