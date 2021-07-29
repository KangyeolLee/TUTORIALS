import {
  EntityRepository,
  Repository,
  InsertResult,
  DeleteResult,
} from 'typeorm';
import Category from '../entities/Category';
import UserCategory from '../entities/UserCategory';
import { UserCategoryForRemoval, UserCategoryType } from '../types/types';

@EntityRepository(UserCategory)
export class UserCategoryRepository extends Repository<UserCategory> {
  findAllByUserId(userId: number): Promise<UserCategory[] | undefined> {
    return this.createQueryBuilder('user_category')
      .select('category.type AS type, user_category.id AS id')
      .leftJoin('user_category.category', 'category')
      .where('user_category.userId = :userId', { userId })
      .getRawMany();
  }

  createUserCategoryByUserId({
    userId,
    categoryId,
    color,
  }: UserCategoryType): Promise<InsertResult | undefined> {
    const result = this.create({
      user: { id: userId },
      category: { id: categoryId },
      color,
    });
    return this.insert(result);
  }

  deleteUserCategoryByUserId({
    userId,
    id,
  }: UserCategoryForRemoval): Promise<DeleteResult> {
    return this.delete({ id, user: { id: userId } });
  }
}

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  createCategoryForUser(type: string): Promise<InsertResult | undefined> {
    const result = this.create({ type });
    return this.insert(result);
  }
}
