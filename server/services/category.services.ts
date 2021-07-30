import { getCustomRepository } from 'typeorm';
import {
  CategoryRepository,
  UserCategoryRepository,
} from '../repositories/category.repository';
import {
  CategoryType,
  ResultRawType,
  UserCategoryForRemoval,
} from '../types/types';

class CategoryService {
  async findCategories(userId: number) {
    try {
      const categories = await getCustomRepository(
        UserCategoryRepository
      ).findAllByUserId(userId);
      return categories;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }

  async createCategory({ userId, type, color }: CategoryType) {
    try {
      const category = await getCustomRepository(
        CategoryRepository
      ).createCategoryForUser(type);
      const {
        raw: { insertId: categoryId },
      }: ResultRawType = category;

      const result = await getCustomRepository(
        UserCategoryRepository
      ).createUserCategoryByUserId({ userId, categoryId, color });

      return result;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }

  async deleteUserCategoryByUserId({ userId, id }: UserCategoryForRemoval) {
    try {
      const result = await getCustomRepository(
        UserCategoryRepository
      ).deleteUserCategoryByUserId({ userId, id });

      return result;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러]' + error);
    }
  }
}

export default new CategoryService();
