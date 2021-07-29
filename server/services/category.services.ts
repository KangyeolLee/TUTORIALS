import { getCustomRepository } from 'typeorm';
import {
  CategoryRepository,
  UserCategoryRepository,
} from '../repositories/category.repository';

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

  async createCategory(userId: number, type: string, color: string) {
    try {
      const category = await getCustomRepository(
        CategoryRepository
      ).createCategoryForUser(type);
      const {
        raw: { insertId },
      } = category!;

      const result = await getCustomRepository(
        UserCategoryRepository
      ).createUserCategoryByUserId(userId, insertId, color);

      return result;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }

  async deleteUserCategoryByUserId(userId: number, id: number) {
    try {
      const result = await getCustomRepository(
        UserCategoryRepository
      ).deleteUserCategoryByUserId(userId, id);

      return result;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러]' + error);
    }
  }
}

export default new CategoryService();
