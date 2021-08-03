import { getCategories } from '@/api/category';
import Observable from '@/Core/Observable';
import { CategoryType } from '@/utils/types';

class CategoryModel extends Observable {
  key: string = 'category';
  categoryList: CategoryType[];

  constructor() {
    super();
    this.categoryList = [];
  }

  async getUserCategories() {
    const res = await getCategories();
    const nextCategoryList = res.data.categories;
    return this.notify(this.key, {
      categoryList: nextCategoryList,
    });
  }
}

export default new CategoryModel();
