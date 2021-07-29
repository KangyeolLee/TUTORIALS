import { getCustomRepository } from 'typeorm';
import CategoryRepository from './../repositories/category.repository';

class CategoryService {
  async findCategories(userId: number) {
    try {
      console.log('hello world');
      const categories = await getCustomRepository(
        CategoryRepository
      ).findAllByUserId(userId);
      console.log(categories);
      return categories;
    } catch (error) {
      throw new Error('[카테고리 쿼리 에러] ' + error);
    }
  }
}

export default new CategoryService();
