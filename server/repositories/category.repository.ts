import { EntityRepository, Repository } from 'typeorm';
import UserCategory from './../entities/UserCategory';

@EntityRepository(UserCategory)
export default class CategoryRepository extends Repository<UserCategory> {
  findAllByUserId(userId: number) {
    try {
      return this.createQueryBuilder('category')
        .where({
          userId,
        })
        .getMany();
    } catch (error) {
      console.log(error);
    }
  }
}
