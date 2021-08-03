import {
  EntityRepository,
  Repository,
  InsertResult,
  DeleteResult,
} from 'typeorm';
import Category from '../entities/Category';
import UserCategory from '../entities/UserCategory';
import { UserCategoryForRemoval, UserCategoryType } from '../types/types';

const defaultCategories = [
  { id: 1, color: '#817DCE' },
  { id: 2, color: '#4A6CC3' },
  { id: 3, color: '#4CA1DE' },
  { id: 4, color: '#94D3CC' },
  { id: 5, color: '#4CB8B8' },
  { id: 6, color: '#6ED5EB' },
  { id: 7, color: '#D092E2' },
];

@EntityRepository(UserCategory)
export class UserCategoryRepository extends Repository<UserCategory> {
  findAllByUserId(userId: number): Promise<UserCategory[] | undefined> {
    return this.createQueryBuilder('user_category')
      .select(
        'user_category.id AS id, category.type AS type, user_category.color AS color'
      )
      .leftJoin('user_category.category', 'category')
      .where('user_category.userId = :userId', { userId })
      .getRawMany();
  }

  createUserCategoryByUserId({
    userId,
    categoryId,
    color,
  }: UserCategoryType): Promise<InsertResult> {
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

  insertDefaultCategory(id: number): Promise<InsertResult> {
    return this.insert(
      defaultCategories.map((c) => {
        return { user: { id }, category: { id: c.id }, color: c.color };
      })
    );
  }
}

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  findCategoryByType(type: string): Promise<Category | undefined> {
    return this.findOne({ type });
  }

  createCategoryForUser(type: string): Promise<InsertResult> {
    const result = this.create({ type });
    return this.insert(result);
  }
}
