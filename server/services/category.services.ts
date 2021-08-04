import { Service } from 'typedi';
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
import { extractInsertId } from '../utils/helper';

@Service()
export default class CategoryService {
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
      const existedCategory = await getCustomRepository(
        CategoryRepository
      ).findCategoryByType(type);

      // ID가 있는 경우에는 추가하지 않고 해당 카테고리ID로 유저카테고리에 추가
      let categoryId;
      if (existedCategory) {
        categoryId = existedCategory.id;
      } else {
        const category = await getCustomRepository(
          CategoryRepository
        ).createCategoryForUser(type);

        categoryId = extractInsertId(category);
      }

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
